<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar class="header-btn">
        <!-- <ion-buttons
          slot="start"
          class="disable-mobile"
        >
          <ion-button
            fill="solid"
            color="secondary"
            @click="closeForm()"
          >
            Cancel
          </ion-button>
        </ion-buttons> -->
        <ion-title>
          {{ this.$route.params.workflowId ? "Edit Workflow" : "Add Integration Events" }}
        </ion-title>
        <!-- <ion-buttons slot="end">
          <ion-button
            fill="solid"
            color="secondary"
            @click="saveWorkflow('AddWorkflow')"
          >
            Report Show
          </ion-button>
        </ion-buttons> -->
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card style="position: inherit; overflow:visible;">
        <ion-card-content>
          <ion-grid>
            <ion-row>
              <ion-col :size="isMobile() ? 12 : 3">
                <ion-label>Campaign</ion-label>
                <ion-input
                  placeholder="Campaign Id"
                  :value="workFlow.WorkflowName"
                  @ionInput="workFlow.WorkflowName = $event.target.value"
                  class="pt-7"
                />
              </ion-col>
              <ion-col :size="isMobile() ? 12 : 3">
                <ion-label>Integration</ion-label>
                <ion-input
                  placeholder="Integration Id"
                  :value="workFlow.WorkflowName"
                  @ionInput="workFlow.WorkflowName = $event.target.value"
                  class="pt-7"
                />
              </ion-col>
              <ion-col :size="isMobile() ? 12 : 3">
                <ion-label>Seller</ion-label>
                <multiselect
                  :options="searchsellerList"
                  :close-on-select="true"
                  v-model="selectedSeller"
                  open-direction="bottom"
                  placeholder="Select Seller"
                />
              </ion-col>
              <ion-col :size="isMobile() ? 12 : 3">
                <ion-label>Buyer</ion-label>
                <multiselect
                  :options="searchBuyerList"
                  :close-on-select="true"
                  v-model="selectedBuyer"
                  open-direction="bottom"
                  placeholder="Select Buyer"
                />
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col :size="isMobile() ? 12 : 3">
                <ion-label>Start Date</ion-label>
                <ion-input
                  type="datetime-local"
                  value="8978522"
                />
              </ion-col>
              <ion-col :size="isMobile() ? 12 : 3">
                <ion-label>End Date </ion-label>
                <ion-input
                  type="datetime-local"
                  value="8978522"
                />
              </ion-col>
              <ion-col :size="isMobile() ? 12 : 3">
                <ion-label>Entered Date</ion-label>
                <ion-input
                  type="datetime-local"
                  value="2020-11-15T01:47"
                  disabled
                />
              </ion-col>
              <ion-col :size="isMobile() ? 12 : 3">
                <ion-label>Entered By</ion-label>
                <ion-input
                  placeholder="Chris"
                  value="Chris"
                  @ionInput="workFlow.WorkflowName = $event.target.value"
                  class="pt-7"
                />
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col :size="isMobile() ? 12 : 3">
                <ion-label>Event Type</ion-label>
                <multiselect
                  :options="searchFieldList"
                  :close-on-select="true"
                  v-model="selectedField"
                  open-direction="bottom"
                  placeholder="Select Event Type"
                />
              </ion-col>
              <ion-col :size="isMobile() ? 12 : 3">
                <ion-item>
                  <div class="dflex">
                    <ion-label>Seller Notified </ion-label>
                    <ion-toggle color="primary" />
                  </div>
                </ion-item>
              </ion-col>
              <ion-col :size="isMobile() ? 12 : 3">
                <ion-item>
                  <div class="dflex">
                    <ion-label>Buyer Notified </ion-label>
                    <ion-toggle color="primary" />
                  </div>
                </ion-item>
              </ion-col>
              <ion-col :size="isMobile() ? 12 : 3">
                <ion-item>
                  <div class="dflex">
                    <ion-label>Revenue Loss Lead Cloud</ion-label>
                    <ion-toggle color="primary" />
                  </div>
                </ion-item>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col :size="isMobile() ? 12 : 3">
                <ion-item>
                  <div class="dflex">
                    <ion-label>Revenue Loss Seller</ion-label>
                    <ion-toggle color="primary" />
                  </div>
                </ion-item>
              </ion-col>
              <ion-col :size="isMobile() ? 12 : 3">
                <ion-item>
                  <div class="dflex">
                    <ion-label>Revenue Loss Buyer</ion-label>
                    <ion-toggle color="primary" />
                  </div>
                </ion-item>
              </ion-col>
              <ion-col :size="isMobile() ? 12 : 3">
                <div class="dflex">
                  <ion-label>Lead Cloudc At Fault</ion-label>
                  <ion-toggle
                    color="primary"
                    checked
                  />
                </div>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col :size="isMobile() ? 12 : 6">
                <ion-label>Notes </ion-label>
                <ion-textarea
                  placeholder="Enter Notes"
                  :value="workFlow.WorkflowDescription"
                  @ionInput="workFlow.WorkflowDescription = $event.target.value"
                />
              </ion-col>
              <ion-col :size="isMobile() ? 12 : 6">
                <ion-label>Internal Notes </ion-label>
                <ion-textarea
                  placeholder="Enter Internal Notes"
                  :value="workFlow.WorkflowDescription"
                  @ionInput="workFlow.WorkflowDescription = $event.target.value"
                />
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <b-table
                  :data="workFlowStepList"
                  :columns="headers"
                  id="my-table"
                >
                  <template slot-scope="props">
                    <b-table-column
                      field="StepNumber"
                      label="Step Number"
                      class="sm-row"
                    >
                      <ion-input
                        id="testid"
                        type="number"
                        :value="props.row.StepNumber"
                        @ionBlur="
                          changeStepNumber(props.row, $event.target.value)
                        "
                      />
                    </b-table-column>
                    <b-table-column
                      field="StepType"
                      label="Step Type"
                    >
                      {{ getCurrStepType(props.row.StepType) }}
                    </b-table-column>
                    <b-table-column
                      field="StepData"
                      label="Step Data"
                      v-show="isValidJson(props.row.StepData)"
                    >
                      <vue-json-pretty
                        :data="getStepDataObj(props.row.StepData, true)"
                        :deep="3"
                        show-double-quotes="false"
                      />
                    </b-table-column>
                    <b-table-column
                      field="StepData"
                      label="Step Data"
                      v-show="!isValidJson(props.row.StepData)"
                      class="stepdata-string"
                    >
                      {{ props.row.StepData }}
                    </b-table-column>
                    <b-table-column>
                      <ion-buttons class="item-float-right">
                        <ion-button
                          color="secondary"
                          @click="openStepDateModal(props.row)"
                        >
                          <ion-icon :src="cdnImageURL('md-create')" />
                        </ion-button>
                        <ion-button
                          color="secondary"
                          @click="confirmDeleteWorkflowStep(props.row)"
                        >
                          <ion-icon :src="cdnImageURL('md-trash')" />
                        </ion-button>
                      </ion-buttons>
                    </b-table-column>
                  </template>
                  <template slot="empty">
                    <div
                      class="ion-padding"
                      v-if="isLoading"
                    >
                      <ion-row
                        v-for="n in 10"
                        :key="n"
                      >
                        <ion-col>
                          <ion-skeleton-text />
                        </ion-col>
                        <ion-col>
                          <ion-skeleton-text />
                        </ion-col>
                        <ion-col>
                          <ion-skeleton-text />
                        </ion-col>
                        <ion-col>
                          <ion-skeleton-text />
                        </ion-col>
                      </ion-row>
                    </div>
                    <div
                      class="ion-text-center"
                      v-if="isLoading"
                    >
                      <div>
                        <i class="icon ion-md-sad" />
                      </div>
                      No Data Available
                    </div>
                  </template>
                </b-table>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col class="text-center">
                <ion-button color="primary">
                  Add Integration Events
                </ion-button>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </div>
</template>
<script>
import VueJsonPretty from 'vue-json-pretty';
import multiselect from 'vue-multiselect';
import stepTypeConfig from '../../data/steptype.config.json';
import utilityService from '../../services/utility.service';
import AppService from '../../App.service';
import AppConst from '../../constants/app.constant';
import window from '../../globalexports/window.export';
import EventBus from '../../bus';
import dummyData from '../../data/dummy.json';

let vm;
export default {
  name: 'AddWorkFlow',
  components: {
    multiselect,
    VueJsonPretty,
  },
  data() {
    return {
      selectedField: 'Select Event Type',
      searchFieldList: ['System Outage', 'Significant Change', 'State Expansion', 'Filter Change', 'Event of Interest'],
      selectedSeller: 'Select Seller',
      searchsellerList: ['Seller1', 'Seller2', 'Seller3', 'Seller4', 'Seller5'],
      selectedBuyer: 'Select Buyer',
      searchBuyerList: ['Buyer1', 'Buyer2', 'Buyer3', 'Buyer4', 'Buyer5'],
      renderComponent: true,
      stepDataList: stepTypeConfig,

      workFlow: {
        WorkflowId: null,
      },
      tabId: window.TabId,
      isWFStepDeleted: null,
      selectedWorkflowType: null,
      selectedOwner: null,
      workFlowStepList: [],
      workflowTypeList: [],
      ownerList: [],
      isLoading: false,
      showDeleteToast: true,
      toDeleteWorkflowStep: {},
      arrSubSet: [],
      headers: [],
      newWorkflowStep: {
        WorkflowId: null,
        StepData: '',
      },
      selectedStepType: null,
      stepTypeList: [],
      currentStepDataJSON: [],
    };
  },
  methods: {
    setDummyData() {
      vm.workFlowStepList = dummyData.WorkflowSteps;
      vm.stepTypeList = dummyData.StepType;
      vm.ownerList = dummyData.Users;
      vm.workFlow = dummyData.Workflow;
      vm.selectedWorkflowType = vm
        .getWorkflowType()
        .filter((obj) => obj.WorkflowTypeId === vm.workFlow.WorkflowTypeId);
      const [selectedWorkflowType] = vm.selectedWorkflowType;
      vm.selectedWorkflowType = selectedWorkflowType;
      const [findSelectedOwner] = vm.ownerList.filter(
        (obj) => obj.UserId === vm.workFlow.OwnerId,
      );
      vm.selectedOwner = findSelectedOwner;
    },
    getWorkflowType() {
      return AppConst.workflowTypeList;
    },
    getStepType() {
      vm.postData('StepType/GetStepType', {}).then((response) => {
        vm.stepTypeList = response.data;
      });
    },
    stepDataGridFormat(data, obj) {
      let cnt = 1;
      const gridDataLocal = [];
      data.forEach((arrObj) => {
        const blankGridObj = utilityService.deepClone(obj.gridData[0].col);
        blankGridObj.forEach((element) => {
          if (element.tag === 'select' && element.onlyValue) {
            const [value] = element.options.filter(
              (opt) => opt.key === arrObj[element.label],
            );
            element.value = value;
          } else {
            element.value = arrObj[element.label] || element.value;
          }
        });
        gridDataLocal.push({ id: cnt, col: blankGridObj });
        cnt += 1;
      });
      return gridDataLocal;
    },
    setCurrentStepDataJSON(data) {
      if (data) {
        vm.currentStepDataJSON.forEach((obj) => {
          if (obj.tag === 'grid') {
            if (obj.onlyValue) {
              obj.gridData = vm.stepDataGridFormat(vm.getArrayObj(data), obj);
            } else if (data[obj.label] && data[obj.label].length > 0) {
              obj.gridData = vm.stepDataGridFormat(data[obj.label], obj);
            } else {
              obj.gridData = [];
            }
          } else if (obj.tag !== 'select' && obj.onlyValue) {
            obj.value = obj.onlyValue ? data : data[obj.label] || obj.value;
          } else if (obj.tag === 'textarea') {
            try {
              obj.value = JSON.stringify(data[obj.label]);
            } catch {
              obj.value = data[obj.label];
            }
          } else if (obj.options.length > 0 && obj.onlyValue) {
            const [value] = obj.options.filter(
              (opt) => opt.key === data[obj.label],
            );
            obj.value = value;
          } else {
            obj.value = data[obj.label];
          }
        });
      } else {
        vm.newWorkflowStep.StepData = utilityService.createStepData(
          vm.currentStepDataJSON,
        );
      }
    },
    selectStepData(value, data) {
      vm.currentStepDataJSON = [];
      vm.stepDataList.forEach((obj) => {
        if (obj.StepType === value.StepType) {
          vm.currentStepDataJSON = utilityService.deepClone(obj.form);
        }
      });
      const isValidJSON = data ? vm.isValidJson(data) : true;
      if (vm.currentStepDataJSON.length === 0 || !isValidJSON) {
        vm.currentStepDataJSON = [
          {
            tag: 'textarea',
            label: '',
            value: '',
            onlyValue: true,
            multiple: false,
            options: [],
          },
        ];
      }
      const isStr = vm.currentStepDataJSON.length === 1
        && vm.currentStepDataJSON[0].onlyValue
        && vm.currentStepDataJSON[0].tag === 'textarea';
      const localData = vm.getStepDataObj(data, !isStr);
      vm.setCurrentStepDataJSON(localData);
    },
    stepAddEditComplete(response) {
      if (vm.workFlowStepList.length > 0) {
        vm.workFlowStepList = vm.workFlowStepList.filter(
          (obj) => obj.StepNumber !== response.StepNumber,
        );
      }
      vm.manageStringReplace(response, true);
      vm.workFlowStepList.push(response);
      vm.newWorkflowStep = {
        WorkflowId: null,
      };
      vm.selectedStepType = null;
      vm.currentStepDataJSON = [];
    },
    saveWorkflowStep(requestFrom) {
      vm.workFlowStepList.forEach((element) => {
        if (typeof element.StepData === 'object') {
          element.StepData = JSON.stringify(element.StepData);
        }
        element = vm.manageStringReplace(element, false);
      });
      vm.postData('WorkflowSteps/SaveWorkflowStep', vm.workFlowStepList)
        .then((resp) => {
          vm.newWorkflowStep = {
            WorkflowId: null,
            StepData: '',
          };
          vm.workFlowStepList.forEach((obj) => {
            obj = vm.manageStringReplace(obj, true);
            if (AppConst.showPrettyJSON.includes(obj.StepType)) {
              obj.showPretty = true;
            }
          });
          if (!resp.data) {
            utilityService.showToast(
              vm,
              AppConst.infoMsg.failtoaddWorkflowStep,
              'Y',
            );
          } else if (requestFrom === 'AddWorkflow') {
            utilityService.showToast(vm, AppConst.infoMsg.saveWorkflow, 'N');
          } else {
            utilityService.showToast(vm, AppConst.infoMsg.addWorkflowStep, 'N');
          }
          vm.selectedStepType = null;
        })
        .catch((error) => {
          utilityService.showToast(
            vm,
            AppConst.infoMsg.failtoaddWorkflowStep,
            'Y',
          );
          window.console.log(error);
          vm.closeModal();
        });
    },
    updateStepNumber(prevstepNumber) {
      let iterate = true;
      const arrLength = vm.workFlowStepList.length;
      if (
        arrLength === 1
        && parseInt(vm.workFlowStepList[0].StepNumber, 10) - prevstepNumber > 0
      ) {
        // Do Nothing
      } else {
        vm.workFlowStepList.every((item, index) => {
          if (iterate) {
            item.StepNumber = parseInt(item.StepNumber, 10) + 1;
            if (index + 1 < arrLength) {
              if (
                parseInt(vm.workFlowStepList[index + 1].StepNumber, 10)
                  - (parseInt(item.StepNumber, 10) - 1)
                > 1
              ) {
                iterate = false;
              }
            }
          }
          return true;
        });
      }
    },
    bumpStepNumber(workflowstepdata, operation) {
      if (operation === 'Add') {
        const arrworkFlowStepList = [];
        const maxStepNumber = Math.max.apply(
          null,
          vm.workFlowStepList.map((o) => parseInt(o.StepNumber, 10)),
        );
        const minStepNumber = Math.min.apply(
          null,
          vm.workFlowStepList.map((o) => parseInt(o.StepNumber, 10)),
        );
        if (parseInt(workflowstepdata.StepNumber, 10) < minStepNumber) {
          vm.workFlowStepList.unshift(workflowstepdata);
        } else if (parseInt(workflowstepdata.StepNumber, 10) > maxStepNumber) {
          vm.workFlowStepList.push(workflowstepdata);
          const arr = vm.workFlowStepList;
          vm.workFlowStepList = [];
          vm.workFlowStepList = arr;
        } else {
          vm.workFlowStepList.every((item, index) => {
            if (parseInt(item.StepNumber, 10) < maxStepNumber) {
              if (
                parseInt(item.StepNumber, 10)
                === parseInt(workflowstepdata.StepNumber, 10)
              ) {
                arrworkFlowStepList.push(workflowstepdata);
                vm.workFlowStepList.splice(0, index);
                vm.updateStepNumber(parseInt(workflowstepdata.StepNumber, 10));
                Array.prototype.push.apply(
                  arrworkFlowStepList,
                  vm.workFlowStepList,
                );
                return false;
              }
              arrworkFlowStepList.push(item);
              return true;
            }
            arrworkFlowStepList.push(workflowstepdata);
            vm.workFlowStepList.splice(0, index);
            vm.updateStepNumber(parseInt(workflowstepdata.StepNumber, 10));
            Array.prototype.push.apply(
              arrworkFlowStepList,
              vm.workFlowStepList,
            );
            return false;
          });
          vm.workFlowStepList = [];
          arrworkFlowStepList.sort(
            (a, b) => parseInt(a.StepNumber, 10) - parseInt(b.StepNumber, 10),
          );
          vm.workFlowStepList = arrworkFlowStepList;
        }
      } else {
        vm.workFlowStepList.every((item, index) => {
          item.StepNumber = index + 1;
          return true;
        });
      }
    },
    addWorkflowStep() {
      vm.newWorkflowStep.WorkflowId = vm.workFlow.WorkflowId;
      if (
        vm.newWorkflowStep
        && vm.newWorkflowStep.StepNumber
        && vm.selectedStepType
        && vm.selectedStepType.StepType
      ) {
        vm.newWorkflowStep.StepType = vm.selectedStepType.StepType;
        if (vm.stepNumberValidtion(vm.newWorkflowStep)) {
          vm.newWorkflowStep = vm.manageStringReplace(
            vm.newWorkflowStep,
            false,
          );
          const workflowstepdata = utilityService.deepClone(vm.newWorkflowStep);
          workflowstepdata.RequestType = 'I';
          if (vm.workFlowStepList.length === 0) {
            vm.workFlowStepList.push(workflowstepdata);
          } else {
            vm.bumpStepNumber(workflowstepdata, 'Add');
          }
          if (vm.workFlowStepList) {
            vm.workFlowStepList.forEach((obj) => {
              obj = vm.manageStringReplace(obj, true);
              if (AppConst.showPrettyJSON.includes(obj.StepType)) {
                obj.showPretty = true;
              }
            });
          }
        }
      } else {
        utilityService.showToast(
          vm,
          AppConst.infoMsg.requiredWorkflowStepValue,
          'Y',
        );
      }
      vm.newWorkflowStep.StepNumber = null;
      vm.selectedStepType = null;
    },
    deleteWorkFlowSteps() {
      // Method not used now but Post has unpredicted behaviour here,
      // need to check in http.service, axios post call returning defer.promise without hitting URL
      const WorkflowId = vm.workFlowStepList.length > 0 ? vm.workFlowStepList[0].WorkflowId : 0;
      vm.postData('WorkflowSteps/DeleteWorkFlowSteps', { WorkflowId })
        .then((resp) => {
          vm.isWFStepDeleted = resp.data;
        })
        .catch(() => {
          // utilityService.showToast(vm, AppConst.infoMsg.failtoaddWorkflowStep, err);
        });
    },
    saveAllWorkFlowData(requestFrom) {
      let noelresult = false;
      if (vm.workFlowStepList.length === 0) {
        noelresult = true;
        const workflowStep = {
          WorkflowId: vm.workFlow.WorkflowId,
          StepNumber: -1,
          StepType: -1,
          NextStep: -1,
          StepData: 'None',
        };
        vm.workFlowStepList.push(workflowStep);
      }
      vm.workFlowStepList.forEach((obj) => {
        obj.RequestType = 'I';
      });
      vm.saveWorkflowStep(requestFrom);
      if (noelresult) {
        vm.workFlowStepList = [];
      }
      vm.isWFStepDeleted = null;
    },
    getOwner() {
      vm.postData('Users/GetUsers', {}).then((response) => {
        vm.ownerList = response.data;
        const [selectedOwner] = vm.ownerList.filter(
          (obj) => obj.UserId === vm.workFlow.OwnerId,
        );
        vm.selectedOwner = selectedOwner;
      });
    },
    getWorkFlow(WorkflowId) {
      if (AppConst.IsLocal) {
        this.getWorkFlowlocal(WorkflowId);
      } else if (WorkflowId) {
        vm.isLoading = true;
        vm.postData('Workflows/GetWorkflow/', { WorkflowId }).then((response) => {
          const [resData] = response.data;
          vm.workFlow = resData;
          const [selectedWorkflowType] = vm
            .getWorkflowType()
            .filter((obj) => obj.WorkflowTypeId === vm.workFlow.WorkflowTypeId);
          vm.selectedWorkflowType = selectedWorkflowType;
          const [selectedOwner] = vm.ownerList.filter(
            (obj) => obj.UserId === vm.workFlow.OwnerId,
          );
          vm.selectedOwner = selectedOwner;
          utilityService.showSpinner(false);
        });
        vm.postData('WorkflowSteps/GetWorkflowStepByWorkflowID/', {
          WorkflowId,
        }).then((response) => {
          vm.isLoading = false;
          vm.workFlowStepList = response.data;
          vm.workFlowStepList.forEach((obj) => {
            obj = vm.manageStringReplace(obj, true);
            if (AppConst.showPrettyJSON.includes(obj.StepType)) {
              obj.showPretty = true;
            }
          });
          utilityService.showSpinner(false);
        });
      } else {
        vm.workFlow = null;
        AppService.goToView(vm, 'addworkflow');
      }
    },
    getWorkFlowlocal(WorkflowId) {
      if (WorkflowId) {
        vm.isLoading = true;
        const [workFlowOfId] = dummyData.Workflows.filter(
          (obj) => obj.WorkflowId === WorkflowId,
        );
        vm.workFlow = workFlowOfId;
        vm.selectedWorkflowType = vm
          .getWorkflowType()
          .filter((obj) => obj.WorkflowTypeId === vm.workFlow.WorkflowTypeId);
        const [selectedWorkflowType] = vm.selectedWorkflowType;
        vm.selectedWorkflowType = selectedWorkflowType;
        vm.selectedOwner = vm.ownerList.filter(
          (obj) => obj.UserId === vm.workFlow.OwnerId,
        );
        utilityService.showSpinner(false);
        vm.workFlowStepList = dummyData.WorkflowSteps.filter(
          (obj) => obj.WorkflowId === WorkflowId,
        );
        if (vm.workFlowStepList.length === 0) {
          vm.workFlowStepList = [];
          vm.isLoading = false;
        } else {
          vm.workFlowStepList.forEach((obj) => {
            obj = vm.manageStringReplace(obj, true);
            if (AppConst.showPrettyJSON.includes(obj.StepType)) {
              obj.showPretty = true;
            }
          });
        }
        utilityService.showSpinner(false);
      } else {
        vm.workFlow = null;
        AppService.goToView(vm, 'addworkflow');
      }
    },

    closeForm() {
      AppService.goToView(vm, 'workflows');
    },
    getStepDataObj(stepData, formatJSON) {
      let result = stepData;
      if (formatJSON) {
        try {
          result = JSON.parse(stepData);
        } catch {
          result = stepData;
        }
      }
      return result;
    },
    confirmDeleteWorkflowStep(workFlowStep) {
      vm.toDeleteWorkflowStep = workFlowStep;
      vm.returnComponent = 'DeleteWorkflowStep';
      utilityService.confirmDelete(
        vm,
        workFlowStep.StepNumber,
        vm.getCurrStepType(workFlowStep.StepType),
      );
    },
    deleteWorkflowStep(deleteRecord) {
      if (deleteRecord) {
        const localworkFlowStepList = utilityService.deepClone(
          vm.workFlowStepList,
        );
        const index = vm.workFlowStepList.findIndex(
          (x) => parseInt(x.StepNumber, 10)
            === parseInt(vm.toDeleteWorkflowStep.StepNumber, 10),
        );
        let i = index;
        let res = false;
        for (i = index; i < vm.workFlowStepList.length - 1; i += 1) {
          if (
            !res
            && parseInt(localworkFlowStepList[i].StepNumber, 10) + 1
              === parseInt(localworkFlowStepList[i + 1].StepNumber, 10)
          ) {
            let newarr = [];
            newarr = utilityService.deepClone(localworkFlowStepList);
            vm.workFlowStepList[i] = newarr[i + 1];

            vm.workFlowStepList[i].StepNumber = parseInt(newarr[i + 1].StepNumber, 10) - 1;
          } else {
            vm.workFlowStepList[i] = localworkFlowStepList[i + 1];
            res = true;
          }
        }
        vm.workFlowStepList.splice(localworkFlowStepList.length - 1, 1);
        vm.toDeleteWorkflowStep = {};
      }
    },
    getCurrStepType(StepType) {
      const stepType = vm.$store.get('StepType');
      let currStepType;
      stepType.forEach((element) => {
        if (element.StepType === StepType) {
          currStepType = element.StepTypeName;
        }
      });
      return currStepType;
    },
    changeStepNumber(rowData, stepNumber) {
      // Start
      const addData = {
        WorkflowId: rowData.WorkflowId,
        StepNumber: parseInt(stepNumber, 10),
        StepType: rowData.StepType,
        NextStep: rowData.NextStep,
        StepData: rowData.StepData,
      };
      // Make deep clone since we donot want to play with original object
      // since it is referenced in view data binding.
      const localworkFlowStepList = utilityService.deepClone(
        vm.workFlowStepList,
      );
      const index = vm.workFlowStepList.findIndex(
        (x) => parseInt(x.StepNumber, 10) === parseInt(rowData.StepNumber, 10),
      );
      let i = index;

      if (parseInt(stepNumber, 10) > parseInt(rowData.StepNumber, 10)) {
        // In this case we need to start from the arrya index where value has changed.
        for (i = index; i < localworkFlowStepList.length - 1; i += 1) {
          if (
            parseInt(localworkFlowStepList[i].StepNumber, 10) + 1
              === parseInt(localworkFlowStepList[i + 1].StepNumber, 10)
            && parseInt(localworkFlowStepList[i + 1].StepNumber, 10)
              <= parseInt(stepNumber, 10)
          ) {
            // Have to do since everything in JS is reference type that is impacting logic.
            let newarr = [];
            newarr = utilityService.deepClone(localworkFlowStepList);
            vm.workFlowStepList[i] = newarr[i + 1];

            vm.workFlowStepList[i].StepNumber = parseInt(newarr[i + 1].StepNumber, 10) - 1;
          } else {
            vm.workFlowStepList[i] = localworkFlowStepList[i + 1];
          }
        }
        vm.workFlowStepList.splice(localworkFlowStepList.length - 1, 1);
        vm.bumpStepNumber(addData, 'Add');
      } else if (parseInt(stepNumber, 10) < parseInt(rowData.StepNumber, 10)) {
        for (i = index; i < localworkFlowStepList.length - 1; i += 1) {
          vm.workFlowStepList[i] = localworkFlowStepList[i + 1];
        }
        vm.workFlowStepList.splice(localworkFlowStepList.length - 1, 1);
        vm.bumpStepNumber(addData, 'Add');
      }
    },
    saveWorkflow(requestFrom) {
      if (AppConst.IsLocal) {
        vm.addWorkflowStep();
      }
      if (
        vm.workFlow
        && vm.workFlow.WorkflowName
        && vm.selectedWorkflowType
        && vm.selectedWorkflowType.WorkflowTypeId
      ) {
        vm.workFlow.OwnerId = vm.selectedOwner ? vm.selectedOwner.UserId : null;
        vm.workFlow.WorkflowTypeId = vm.selectedWorkflowType.WorkflowTypeId;
        vm.postData('Workflows/CheckWorkflowNameExists/', {
          WorkflowName: vm.workFlow.WorkflowName,
        }).then((response) => {
          if (response.data && !vm.workFlow.WorkflowId) {
            utilityService.showToast(
              vm,
              AppConst.infoMsg.workflowNameAlreadyExists.replace(
                '~$$~',
                vm.workFlow.WorkflowName,
              ),
              'Y',
            );
          } else {
            const postData = utilityService.deepClone(vm.workFlow);
            vm.postData('Workflows/SaveWorkflow', postData)
              .then((saveResponse) => {
                if (requestFrom === 'AddWorkflow') {
                  vm.saveAllWorkFlowData(requestFrom);
                  utilityService.showToast(
                    vm,
                    AppConst.infoMsg.saveWorkflow,
                    'N',
                  );
                  const [workFlow] = saveResponse.data;
                  vm.workFlow = workFlow;
                } else if (requestFrom === 'AddWorkflowStep') {
                  const [workFlow] = saveResponse.data;
                  vm.workFlow = workFlow;
                  vm.addWorkflowStep();
                }
              })
              .catch((error) => {
                window.console.log(error);
              });
          }
        });
      } else {
        utilityService.showToast(
          vm,
          AppConst.infoMsg.requiredWorkflowValue,
          'Y',
        );
      }
    },
    stepNumberValidtion(workflowSteps) {
      let validationMsg = '';
      let status = true;
      AppConst.preventStepNumber.forEach((element) => {
        if (
          workflowSteps.StepType === element.StepType
          && element.preventFrom.includes(parseInt(workflowSteps.StepNumber, 10))
        ) {
          status = false;
          validationMsg = `${AppConst.infoMsg.preventLogLeadHistory}\n`;
        }
      });
      if (!status) {
        utilityService.showToast(vm, validationMsg, 'Y');
      }
      return status;
    },
    nextAvailableStep(stepNumber, firstRequest = false) {
      let isNotAvailable = false;
      vm.workFlowStepList.forEach((element) => {
        if (parseInt(element.StepNumber, 10) === stepNumber) {
          isNotAvailable = true;
        }
      });
      if (isNotAvailable) {
        stepNumber = firstRequest ? 1 : stepNumber + 1;
        return vm.nextAvailableStep(stepNumber);
      }
      return stepNumber;
    },
    manageStringReplace(obj, replace) {
      if (replace) {
        AppConst.replaceStepData.forEach((element) => {
          if (element.StepType === obj.StepType) {
            obj.StepData = obj.StepData.replace(element.From, element.To);
          }
        });
      } else if (parseInt(obj.StepType, 10) === 3) {
        obj.StepData = `SupplierIntegrations/${obj.StepData.replace(
          'SupplierIntegrations/',
          '',
        )}`;
      }
      return obj;
    },
    updateWorkflowStep(workflowStep) {
      if (workflowStep.StepNumber) {
        const tmpworkFlowStepList = vm.workFlowStepList.filter(
          (el) => parseInt(el.StepNumber, 10)
            !== parseInt(workflowStep.StepNumber, 10),
        );
        workflowStep.RequestType = 'SD';
        tmpworkFlowStepList.push(workflowStep);
        vm.workFlowStepList = [];
        vm.workFlowStepList = tmpworkFlowStepList;
        utilityService.sortWorkflowSteps(vm.workFlowStepList);
        vm.workFlowStepList.forEach((obj) => {
          obj = vm.manageStringReplace(obj, true);
          if (AppConst.showPrettyJSON.includes(obj.StepType)) {
            obj.showPretty = true;
          }
        });
        vm.currentStepDataJSON = [];
      }
    },
  },
  created() {
    vm = this;
    EventBus.$on('DeleteWorkflowStep', vm.deleteWorkflowStep);
    EventBus.$on('UpdateWorkflowStep', vm.updateWorkflowStep);
  },
};
</script>
<style>
.dflex{
  display: flex;
    justify-content: center;
    align-items: center;
}
.text-center {
  text-align: center;
}
</style>
