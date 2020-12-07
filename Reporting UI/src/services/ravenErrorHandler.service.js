import Vue from 'vue';
import underscore from 'underscore';
import Sentry from '../globalexports/sentry.export';
import Integrations from '../globalexports/sentry.integrations.export';
import window from '../globalexports/window.export';
import AppConst from '../constants/app.constant';
import appInfo from '../app.info';

const ravenErrorHandler = function () {
  const content = {};
  // Turn this true if want to test sentry
  const testingSentry = false;
  content.sentryDsn = 'https://befd3a28a959418ab0158aa675232eaf@sentry.io/1499629';
  content.ignoreErrorsList = ["Object doesn't support property or method", 'browser.name = IE',
    'browser.name = Edge',
  ];
  content.checkIfWeShouldReport = function (ex) {
    let shouldReport = true;
    underscore.each(content.ignoreErrorsList, (item) => {
      if (ex && JSON.stringify(ex.exception).indexOf(item) > -1) {
        shouldReport = false;
      }
    });
    return shouldReport;
  };
  content.initializeRaven = function () {
    if (window.location.hostname === 'localhost' || window.location.hostname === 'dnndev.me') {
      return;
    }
    if (window.location.host === window.location.hostname || testingSentry) {
      Sentry.init({
        release: `LeadCloud-${appInfo.applicationVersion}-${appInfo.bundleVersion}`,
        dsn: content.sentryDsn,
        // transport: Sentry.Transports.FetchTransport,
        integrations: [new Integrations.Vue({
          Vue,
          attachProps: true,
        })],
        environment: 'WEB',
        excluded_exceptions: content.ignoreErrorsList,
        beforeSend(exception) {
          if (content.checkIfWeShouldReport(exception)) {
            exception.user = {
              id: content.getUserNameForErrorLog(),
            };
            if (!exception.extra) {
              exception.extra = {};
            }
            return exception;
          }
          return null;
        },
      });
      Sentry.configureScope((scope) => {
        scope.setTag('appversion', appInfo.applicationVersion);
      });
    }
  };
  content.getUserNameForErrorLog = function () {
    const localStorageKeys = Object.keys(localStorage);
    let username = null;
    underscore.each(localStorageKeys, (item) => {
      if (item.match(new RegExp(AppConst.usernameKeyCognito))) {
        username = localStorage.getItem(item);
      }
    });
    return username;
  };
  content.appendTags = function (extraTag, scope) {
    let defaultTags = {};
    if (extraTag) {
      defaultTags = extraTag;
    }
    const allTags = Object.keys(defaultTags);
    if (allTags) {
      underscore.each(allTags, (tagItem) => {
        scope.setTag(tagItem, defaultTags[tagItem]);
      });
    }
  };
  content.setUserContext = function () {
    Sentry.configureScope((scope) => {
      scope.setUser('email', content.getUserNameForErrorLog());
    });
  };
  content.isError = function (e) {
    return e && e.stack && e.message && typeof e.stack === 'string' && typeof e.message
      === 'string';
  };
  content.reportToSentry = function (errorData, extraTag) {
    try {
      let errorDataKeys = [];
      if (errorData !== null && typeof errorData === 'object') {
        errorDataKeys = Object.keys(errorData);
      }
      let errorMessage;
      let tempError;
      /// Setting user context Start
      content.setUserContext();
      /// Setting user context End
      if (typeof errorData.exception !== 'string') {
        errorMessage = errorData.message || (
          errorData.exception
            ? errorData.exception.message
            : ''
        );
      } else {
        errorMessage = errorData.exception;
      }
      if (!errorMessage) {
        errorMessage = JSON.stringify(errorData);
      }
      Sentry.withScope((scope) => {
        /// Tags Start
        content.appendTags(extraTag, scope);
        /// Tags END
        if (errorData.stack) {
          scope.setExtra('stackInfo', errorData.stack);
        }
        underscore.each(errorDataKeys, (key) => {
          scope.setExtra(`ErrorProperty:${key}`, JSON.stringify(errorData[key]));
        });
        if (content.isError(errorData)) {
          Sentry.captureException(errorData);
        } else if (errorMessage) {
          tempError = new Error(errorMessage);
          Sentry.captureException(tempError, {
            extra: errorData,
          });
        }
      });
    } catch (ee) {
      window.console.log(ee);
    }
  };
  return content;
};
export default ravenErrorHandler();
