import underscore from 'underscore';
import EventBus from '../bus';
import AppConst from '../constants/app.constant';
// import window from "@/globalexports/window.export.js";

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
  contents.openModal = function (vm, Modal, workflowStep) {
    vm.$ionic.modalController
      .create({
        component: Modal,
        componentProps: {
          data: {
            workflowStep,
          },
        },
      }).then((modalElement) => {
        modalElement.present();
        modalElement.onDidDismiss().then((res) => {
          if (res && res.data && res.data !== 'close') {
            contents.refreshViewData(vm, Modal.name, res.data);
          } else if (res && res.data === 'close') {
            vm.currentStepDataJSON = [];
          }
        });
      });
  };
  contents.refreshViewData = function (vm, requestFrom, formData) {
    if (requestFrom === 'AddqStepData' && formData.StepData) {
      vm.newWorkflowStep.StepData = formData.StepData;
      EventBus.$emit('UpdateWorkflowStep', formData);
    }
  };
  contents.confirmDelete = function (vm, stepNumber, stepType) {
    let msg = `Please confirm deletion of <br> step ${stepNumber} - ${stepType}?`;
    if (!(stepNumber && stepType)) {
      msg = 'Please confirm deletion of <br> step?';
    }
    vm.$ionic.alertController
      .create({
        header: 'Confirm!',
        message: msg,
        buttons: [{
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'btn-default',
          handler: () => contents.deleteCallBack(vm.returnComponent, false),
        },
        {
          text: 'Yes',
          cssClass: 'btn-danger',
          handler: () => contents.deleteCallBack(vm.returnComponent, true),
        },
        ],
      })
      .then((a) => a.present());
  };

  contents.deleteCallBack = function (returnComponent, result) {
    EventBus.$emit(returnComponent, result);
  };
  contents.closeModal = function (vm, returnObj) {
    vm.$ionic.modalController.dismiss(returnObj);
  };
  contents.showSpinner = function (isVisible) {
    const loader = document.getElementById('loader');
    if (loader) {
      if (isVisible) {
        loader.style.display = 'inline';
      } else {
        loader.style.display = 'none';
      }
    }
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
  contents.sortWorkflowSteps = function (workFlowStepList) {
    return workFlowStepList.sort((a, b) => a.StepNumber - b.StepNumber);
  };
  contents.createStepData = function (workflowStepTags) {
    let stepData = {};
    let result;
    workflowStepTags.forEach((element) => {
      const label = element.label.trim();
      if (element.tag === 'grid') {
        if (element.gridData.length > 0) {
          let temp;
          element.gridData.forEach((obj) => {
            temp = temp ? `${temp},${contents.createStepData(obj.col)}` : contents
              .createStepData(obj.col);
          });
          if (element.onlyValue) {
            stepData = `[${temp}]`;
          } else {
            stepData[label] = JSON.parse(`[${temp}]`);
          }
        }
      } else if (element.onlyValue && element.tag !== 'select') {
        stepData = element.value;
      } else if (element.onlyValue && element.tag === 'select') {
        stepData[label] = element.value.key ? element.value.key : element.value;
      } else if (element.tag === 'textarea' && element.value) {
        try {
          const val = JSON.parse(element.value);
          if (Array.isArray(val)) {
            stepData[label] = val;
          } else {
            stepData[label] = JSON.parse(`[${element.value}]`);
          }
        } catch {
          try {
            const elValue = element.value.replace('[', '').replace(']', '');
            stepData[label] = JSON.parse(`[${elValue}]`);
          } catch {
            if (element.value.indexOf(',') > 0) {
              const elValue1 = element.value.replace('[', '').replace(']', '');
              stepData[label] = elValue1.split(',');
            } else {
              stepData[label] = [];
              stepData[label].push(element.value);
            }
          }
        }
      } else {
        stepData[label] = element.value;
      }
    });
    if (typeof stepData === 'object') {
      result = JSON.stringify(stepData);
    } else {
      result = stepData;
    }
    return result;
  };
  return contents;
};
export default utilityService();
