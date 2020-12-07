<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar class="header-btn">
        <ion-buttons slot="start">
          <ion-button
            fill="solid"
            color="secondary"
            @click="closeModal()"
          >
            Cancel
          </ion-button>
        </ion-buttons>
        <ion-title>
          Add/Edit StepData ({{ workflowStep.StepTypeName }})
        </ion-title>
        <ion-buttons slot="end">
          <ion-button
            fill="solid"
            color="secondary"
            @click="saveStepData()"
          >
            Save
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card class="stepdata-modal">
        <ion-card-content>
          <ion-row>
            <ion-col v-show="showInvalidJSON">
              <ion-label
                color="danger"
              >
                StepData for StepType ({{ workflowStep.StepTypeName }}) is
                expected to be a valid JSON
              </ion-label>
            </ion-col>
          </ion-row>
          <ion-row
            v-for="(source, index) in workflowStep.Tags"
            :key="index"
          >
            <ion-col v-if="source.tag === 'input'">
              <ion-label>{{ source.label }}</ion-label>
              <ion-input
                :placeholder="'Enter ' + source.label"
                :value="source.value"
                @ionInput="source.value = $event.target.value"
              />
            </ion-col>
            <ion-col v-else-if="source.tag === 'textarea'">
              <ion-label>{{ source.label }}</ion-label>
              <ion-textarea
                :placeholder="'Enter ' + (source.label || 'StepData')"
                :value="source.value"
                @ionInput="source.value = $event.target.value"
                :rows="8"
              />
            </ion-col>
            <ion-col v-else-if="source.tag === 'select'">
              <ion-label>{{ source.label }}</ion-label>
              <multiselect
                v-model="source.value"
                :placeholder="'Select ' + source.label"
                :options="source.options"
                :multiple="source.multiple"
                :taggable="true"
                :hide-selected="true"
                @tag="addSelectedValue($event, source)"
              />
            </ion-col>
            <ion-col v-else-if="source.tag === 'toggle'">
              <ion-label>{{ source.label }}</ion-label>
              <ion-toggle
                :checked="source.value"
                @ionChange="source.value = $event.target.checked"
              />
            </ion-col>
            <ion-col v-else-if="source.tag === 'grid'">
              <ion-row>
                <ion-col>
                  <ion-card-subtitle>{{ source.label }}</ion-card-subtitle>
                </ion-col>
                <ion-col>
                  <ion-buttons class="item-float-right">
                    <ion-button
                      color="secondary"
                      @click="addMoreRow(source)"
                    >
                      <ion-icon :src="cdnImageURL('md-add')" />
                    </ion-button>
                  </ion-buttons>
                </ion-col>
              </ion-row>
              <b-table :data="source.gridData">
                <template slot-scope="props">
                  <b-table-column
                    v-for="(intSource, intIndex) in props.row.col"
                    :key="intIndex"
                    :label="intSource.label"
                  >
                    <div v-if="intSource.tag === 'input'">
                      <ion-input
                        :placeholder="'Enter ' + intSource.label"
                        :value="intSource.value"
                        @ionInput="intSource.value = $event.target.value"
                      />
                    </div>
                    <div v-else-if="intSource.tag === 'textarea'">
                      <ion-textarea
                        :placeholder="'Enter ' + intSource.label"
                        :value="intSource.value"
                        @ionInput="intSource.value = $event.target.value"
                      />
                    </div>
                    <div v-else-if="intSource.tag === 'select'">
                      <multiselect
                        v-model="intSource.value"
                        label="value"
                        :placeholder="'Select ' + intSource.label"
                        :options="intSource.options"
                        :show-labels="false"
                        :multiple="intSource.multiple"
                      >
                        <template
                          slot="singleLabel"
                          slot-scope="{ option }"
                        >
                          {{
                            option.value
                          }}
                        </template>
                      </multiselect>
                    </div>
                    <div v-else-if="intSource.tag === 'toggle'">
                      <ion-toggle
                        :checked="intSource.value"
                        @ionChange="intSource.value = $event.target.checked"
                      />
                    </div>
                  </b-table-column>
                  <b-table-column>
                    <ion-buttons class="item-float-right">
                      <ion-button
                        color="secondary"
                        @click="confirmDeleteGridRow(source, props.row.id)"
                      >
                        <ion-icon :src="cdnImageURL('md-trash')" />
                      </ion-button>
                    </ion-buttons>
                  </b-table-column>
                </template>
                <template slot="empty">
                  <div class="ion-text-center">
                    <div>
                      <i class="icon ion-md-sad" />
                    </div>
                    No Data Available
                  </div>
                </template>
              </b-table>
            </ion-col>
          </ion-row>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </div>
</template>
<script>
import multiselect from 'vue-multiselect';
import stepTypeConfig from '../../data/steptype.config.json';
import utilityService from '../../services/utility.service';
import EventBus from '../../bus';
import AppConst from '../../constants/app.constant';

let vm;
export default {
  name: 'AddStepData',
  components: {
    multiselect,
  },
  data() {
    return {
      stepDataList: stepTypeConfig,
      stepTypeId: {},
      tags: [],
      workflowStep: {
        WorkflowStep: {},
        Tags: [],
      },
      showInvalidJSON: false,
    };
  },
  methods: {
    closeModal(returnObj) {
      const postData = !returnObj && vm.workflowStep.WorkflowStep.WorkflowId
        ? 'close'
        : returnObj;
      utilityService.closeModal(vm, postData);
    },
    saveStepData() {
      vm.workflowStep.WorkflowStep.StepData = utilityService.createStepData(
        vm.workflowStep.Tags,
      );
      const tempPostData = {
        WorkflowId: vm.workflowStep.WorkflowStep.WorkflowId,
        StepNumber: vm.workflowStep.WorkflowStep.StepNumber,
        StepData: vm.workflowStep.WorkflowStep.StepData,
        StepType: vm.workflowStep.WorkflowStep.StepType,
      };
      vm.closeModal(tempPostData);
    },
    addMoreRow(source) {
      vm.stepDataList.forEach((obj) => {
        if (obj.StepType === vm.workflowStep.StepType) {
          obj.form.forEach((element) => {
            if (element.label === source.label) {
              source.gridData.push(
                utilityService.deepClone(element.gridData[0]),
              );
            }
          });
        }
      });
    },
    confirmDeleteGridRow(source, id) {
      vm.deleteGridRowID = id;
      vm.source = source;
      vm.returnComponent = 'DeleteGridRow';
      utilityService.confirmDelete(vm);
    },
    deleteGridRow(deleteRecord) {
      if (deleteRecord) {
        vm.source.gridData = vm.source.gridData.filter(
          (obj) => obj.id !== vm.deleteGridRowID,
        );
      }
    },
    addSelectedValue(value, source) {
      source.value = !source.value ? [] : source.value;
      source.value.push(value);
    },
    validateInvalidJSON() {
      const node = vm.workflowStep.Tags;
      vm.showInvalidJSON = node.length === 1
        && node[0].onlyValue
        && node[0].tag === 'textarea'
        && AppConst.showPrettyJSON.includes(vm.workflowStep.WorkflowStep.StepType);
    },
  },
  created() {
    vm = this;
    vm.validateInvalidJSON();
    EventBus.$on('DeleteGridRow', vm.deleteGridRow);
  },
  beforeDestroy() {
    EventBus.$off('DeleteGridRow', vm.deleteGridRow);
  },
};
</script>
