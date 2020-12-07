// https://ej2.syncfusion.com/vue/documentation/rich-text-editor/getting-started/#installation-and-configuration
import Vue from 'vue';
import Ionic from '@ionic/vue';
import Buefy, { Table, Input } from 'buefy';
import vueStore from '@websanova/vue-store';
import underscore from 'underscore';
import { RichTextEditorPlugin } from '@syncfusion/ej2-vue-richtexteditor';
import sharedMethods from './mixins/sharedMethods.mixin';
import AppConst from './constants/app.constant';
import router from './router';
import App from './App.vue';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(RichTextEditorPlugin);
Vue.use(Buefy);
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
  }
}

main();
