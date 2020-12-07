import axios from 'axios';
import $q from 'q';
import window from '../globalexports/window.export';
import AppConst from '../constants/app.constant';
import utilityService from './utility.service';
// import ravenErrorHandlerService from "@/services/ravenErrorHandler.service.js";
// Add a response interceptor

const httpService = function () {
  const contents = {};
  const httpClient = axios.create();
  httpClient.interceptors.request.use((config) => {
    // Do something before request is sent
    config.msBeforeAjaxCall = Date.now();
    // window.console.log(config.msBeforeAjaxCall);
    return config;
  }, (error) => Promise.reject(error));
  httpClient.interceptors.response.use((response) => response,
    (error) => {
      if (error.config) {
        error.config.msAfterAjaxCall = Date.now();
        error.config.timeTakenInMs = error.config.msAfterAjaxCall - error.config
          .msBeforeAjaxCall;
      }
      error.message = `${error.message}: ${JSON.stringify(error)}`;
      // Any kind of http error will be logged to sentry
      // ravenErrorHandlerService.reportToSentry(error);
      // Do something with response error
      return Promise.reject(error);
    });
  contents.getApiURL = function (postURL) {
    let preURL;
    if (window.CurrentDNNUser) {
      if (window.BrokersAppServiceURL.charAt(0) === 'D') {
        preURL = window.BrokersAppRootURL + window.BrokersAppServiceURL;
      } else {
        preURL = window.BrokersAppServiceURL;
      }
    }
    return preURL + postURL;
  };
  contents.http_post = function (postURL, requestdata) {
    utilityService.showSpinner(true);
    const deferred = $q.defer();
    axios.post(contents.getApiURL(postURL), requestdata, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: AppConst.httpRequestTimeouts,
    }).then((response) => {
      deferred.resolve(response);
      utilityService.showSpinner(false);
    }).catch((error) => {
      window.console.log(error);
      deferred.reject(null);
      utilityService.showSpinner(false);
    });
    return deferred.promise;
  };
  return contents;
};
export default httpService();
