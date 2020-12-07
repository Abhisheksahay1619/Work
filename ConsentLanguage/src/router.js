import Vue from 'vue';
import Router from 'vue-router';
import ConsentLanguageList from './views/consent_language/consent_language_list.vue';
import AddConsentLanguage from './views/add_consent_language/add_consent_language.vue';
import ConsentLanguageHistory from './views/consent_language_history/consent_language_history.vue';

Vue.use(Router);

const router = new Router({
  routes: [{
    path: '/',
    redirect: '/consent_language_list',
  }, {
    path: '/consent_language_list',
    name: 'app.consent_language_list',
    component: ConsentLanguageList,
    props: true,
  }, {
    path: '/add_consent_language',
    name: 'app.add_consent_language',
    component: AddConsentLanguage,
    props: true,
  },
  {
    path: '/consent_language_history',
    name: 'app.consent_language_history',
    component: ConsentLanguageHistory,
    props: true,
  }],
});
export default router;
