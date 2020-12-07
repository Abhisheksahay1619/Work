const appService = function () {
  const content = {};
  content.goToView = function (vm, view) {
    switch (view) {
      case 'consent_language_list':
        vm.$router.push('/consent_language_list');
        break;
      case 'add_consent_language':
        vm.$router.push('/add_consent_language');
        break;
      case 'consent_language_history':
        vm.$router.push('/consent_language_history');
        break;
      default:
        vm.$router.push(view);
    }
  };
  return content;
};
export default appService();
