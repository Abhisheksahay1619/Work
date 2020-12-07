import Vue from 'vue';
import Router from 'vue-router';
import IntegrationEvents from './views/integration_events/Integration_events.vue';
import AddIntegrationEvents from './views/add_integration_events/Add_integration_events.vue';

Vue.use(Router);

const router = new Router({
  routes: [{
    path: '/',
    redirect: '/Integration_events',
  }, {
    path: '/Integration_events',
    name: 'app.Integration_events',
    component: IntegrationEvents,
    props: true,
  }, {
    path: '/Add_integration_events',
    name: 'app.Add_integration_events',
    component: AddIntegrationEvents,
    props: true,
  }],
});
export default router;
