import Vue from 'vue';
import Router from 'vue-router';
import Report from './views/Report/Report.vue';
import ReportModal from './components/ReportModal/ReportModal.vue';

Vue.use(Router);

const router = new Router({
  routes: [{
    path: '/',
    redirect: '/report',
  }, {
    path: '/report',
    name: 'app.report',
    component: Report,
  }, {
    path: '/addreport',
    name: 'app.addreport',
    component: ReportModal,
  }],
});
export default router;
