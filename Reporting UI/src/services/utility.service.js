import underscore from 'underscore';
import AppConst from '../constants/app.constant';

const utilityService = function () {
  const contents = {};
  contents.deepClone = function (obj) {
    return (
      (!obj || (typeof obj !== 'object'))
        ? obj
        : (underscore.isString(obj))
          ? String.prototype.slice.call(obj)
          : (underscore.isDate(obj))
            ? new Date(obj.valueOf())
            : (underscore.isFunction(obj.clone))
              ? obj.clone()
              : (underscore.isArray(obj))
                ? underscore.map(obj, (t) => contents.deepClone(t))
                : underscore.mapObject(obj, (val) => contents.deepClone(val))
    );
  };
  contents.openModal = function (vm, Modal, content) {
    vm.$ionic.modalController
      .create({
        component: Modal,
        componentProps: {
          data: {
            content,
          },
        },
      }).then((modalElement) => {
        modalElement.present();
        modalElement.onDidDismiss().then((res) => {
          if (res && res.data) {
            contents.refreshViewData(vm, Modal.name, res.data);
          }
        });
      });
  };
  contents.refreshViewData = function (vm, requestFrom, formData) {
    if (requestFrom === 'ReportModal') {
      vm.returns.forEach((element) => {
        if (element.leadcloud_transaction_id === formData) {
          element.transaction_status = 2;
        }
      });
    }
  };
  contents.closeModal = function (vm, returnObj) {
    vm.$ionic.modalController.dismiss(returnObj);
  };
  contents.showToast = function (vm, message, isDangerYN) {
    const cssClass = isDangerYN === 'Y' ? 'danger' : 'success';
    vm.$ionic.toastController.create({
      message,
      duration: AppConst.toastDelay,
      position: 'top',
      color: cssClass,
    }).then((a) => a.present());
  };
  contents.showSpinner = function (isVisible) {
    if (isVisible) {
      document.getElementById('loader').style.display = 'inline';
    } else {
      document.getElementById('loader').style.display = 'none';
    }
  };
  return contents;
};
export default utilityService();
