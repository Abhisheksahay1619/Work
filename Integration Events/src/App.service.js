const appService = function () {
  const content = {};
  content.goToView = function (vm, view) {
    switch (view) {
      case 'Integration_events':
        vm.$router.push('/Integration_events');
        break;
      case 'Add_integration_events':
        vm.$router.push('/Add_integration_events');
        break;
      default:
        vm.$router.push(view);
    }
  };
  return content;
};
export default appService();
