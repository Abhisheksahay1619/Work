import Vue from 'vue';
import Ionic from '@ionic/vue';
import { Table, Input } from 'buefy';
import vueStore from '@websanova/vue-store';
import underscore from 'underscore';
import sharedMethods from './mixins/sharedMethods.mixin';
import AppConst from './constants/app.constant';
import router from './router';
import App from './App.vue';

// import ravenErrorHandlerService from "@/services/ravenErrorHandler.service.js";
Vue.use(Ionic);
Vue.use(Table);
Vue.use(Input);
Vue.mixin(sharedMethods);
Vue.use(vueStore);

function startApplication() {
  new Vue({
    router,
    // vuetify: new Vuetify({}),
    render: (h) => h(App),
  }).$mount('#app');
}

function detectIE() {
  const ua = window.navigator.userAgent;
  // return true;
  const msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  const trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    const rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  const edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
}

function checkIfInternetExplorer() {
  const version = detectIE();
  let showIEWaring = false;
  if (version && version > 1) {
    showIEWaring = true;
    window.console.log('Browser not supported');
  }
  if (showIEWaring) {
    document.getElementById('ieWarning').style.display = 'block';
  }
  return showIEWaring;
}
const handleResizeEvent = underscore.debounce(() => {
  const headerElement = document.getElementsByClassName('head_main');
  if (headerElement.length > 0) {
    document.getElementsByTagName('ion-split-pane')[0].style.marginTop = `${headerElement[0].getBoundingClientRect().height}px`;
  }
  const height = `${window.innerHeight - document.getElementsByTagName('ion-split-pane')[0].getBoundingClientRect().y - 5}px`;
  document.getElementsByTagName('ion-split-pane')[0].style.minHeight = height;
  document.getElementsByTagName('ion-split-pane')[0].style.maxHeight = height;
  const personaBar = document.getElementsByClassName('personalBarContainer');
  if (personaBar.length > 0) {
    document.getElementsByTagName('body')[0].classList.add('personabar-mr');
  }
}, AppConst.resizeDebounce);

function main() {
  if (window.CurrentDNNUser) {
    if (window.BrokersAppServiceURL && window.BrokersAppServiceURL
      !== '[ModuleContext:ServiceURL]') {
      startApplication();
      setTimeout(() => {
        handleResizeEvent();
        window.addEventListener('resize', handleResizeEvent);
      }, AppConst.resizeTimeout);
      // ravenErrorHandlerService.initializeRaven();
    } else {
      const missingInfo = document.getElementById('serviceAPIMissing');
      missingInfo.style.display = 'block';
    }
  } else {
    startApplication();
    // ravenErrorHandlerService.initializeRaven();
  }
}
if (!checkIfInternetExplorer()) {
  main();
}
