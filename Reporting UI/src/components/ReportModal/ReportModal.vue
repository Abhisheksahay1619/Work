<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="secondary">
        <ion-title>Return Lead</ion-title>
        <ion-button
          slot="end"
          @click="closeModal()"
          color="secondary"
        >
          <ion-icon :src="cdnImageURL('md-close')" />
        </ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card class="stepdata-modal">
        <ion-card-content>
          <ion-row>
            <ion-col>
              <ion-note
                color="primary"
                class="return-title"
              >
                {{ content.Name }} ({{ content.TransactionId }})
              </ion-note>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-label>Why are you returning this lead?</ion-label>
              <multiselect
                :options="reasonsList"
                :close-on-select="true"
                v-model="selectedReason"
                label="DisplayLabel"
                open-direction="bottom"
                placeholder="Select Reason"
              />
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-label>Comments</ion-label>
              <ion-textarea
                placeholder="Enter Comments"
                :value="comments"
                @ionInput="comments = $event.target.value"
              />
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-button @click="saveReason">
                Submit
              </ion-button>
            </ion-col>
          </ion-row>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>
<script>
import multiselect from 'vue-multiselect';
import utilityService from '../../services/utility.service';
import AppConst from '../../constants/app.constant';
import {
  getLoadReturnReasonsBySellerName,
  getLoadByTransactionId,
  saveReturnReason,
} from '../../services/data.service';

let vm;
export default {
  name: 'ReportModal',
  components: {
    multiselect,
  },
  data() {
    return {
      content: {},
      selectedReason: null,
      reasonsList: [],
      comments: '',
    };
  },
  methods: {
    closeModal(returnObj) {
      utilityService.closeModal(vm, returnObj);
    },
    getReturnReason() {
      getLoadReturnReasonsBySellerName(vm.content.SellerName).then((data) => {
        vm.reasonsList = data.SellerReturnReason;
        vm.getTransactionReason();
      });
    },
    getTransactionReason() {
      getLoadByTransactionId(vm.content.BuyerId, vm.content.TransactionId).then(
        (data) => {
          if (data.Status !== 'Error') {
            const [selectedReason] = vm.reasonsList.filter(
              (element) => element.ReturnCode === data.Reason,
            );
            vm.selectedReason = selectedReason;
            vm.comments = data.Comments;
            vm.content.Status = data.Status;
          }
        },
      );
    },
    saveReason() {
      if (vm.selectedReason && vm.selectedReason.ReturnCode) {
        const postData = {
          TransactionId: vm.content.TransactionId,
          BuyerId: vm.content.BuyerId,
          Reason: vm.selectedReason.ReturnCode,
          Comments: vm.comments,
        };
        saveReturnReason(postData).then((data) => {
          if (data.ResponseStatus === 'PendingReturn') {
            vm.postData('Return/UpdateTransactionStatus', {
              Id: vm.content.TransactionId,
            }).then((response) => {
              if (response && response.data) {
                utilityService.showToast(vm, AppConst.infoMsg.returnSaved, 'N');
                vm.closeModal(vm.content.TransactionId);
              }
            });
          } else if (data.ResponseStatus === 'Error') {
            utilityService.showToast(vm, data.Message, 'Y');
          }
        });
      } else {
        utilityService.showToast(vm, AppConst.infoMsg.returnValidation, 'Y');
      }
    },
  },
  mounted() {
    vm.getReturnReason();
  },
  created() {
    vm = this;
  },
};
</script>
