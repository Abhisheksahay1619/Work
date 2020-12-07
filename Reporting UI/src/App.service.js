const appService = function () {
  const content = {};
  content.goToView = function (vm, view) {
    switch (view) {
      case 'report':
        vm.$router.push('/report');
        break;
      default:
        vm.$router.push(view);
    }
  };
  return content;
};
export default appService();
