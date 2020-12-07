<template>
  <ion-page>
    <ion-header class="lc-header">
      <ion-toolbar  class="lc-header">
        <ion-title class="lc-header">
          Reporting
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-card-content>
              <ion-row>
                <ion-col :size="isMobile() ? 12 : 2">
                  <ion-label position="stacked">
                    Start Date 
                  </ion-label>
                  <Datepicker v-model="date" format="yyyy-MM-dd"></Datepicker>
                 
                </ion-col>
                 <ion-col :size="isMobile() ? 12 : 2">
                  <ion-label position="stacked">
                   End Date 
                  </ion-label>
                  <Datepicker v-model="date1" format="yyyy-MM-dd"></Datepicker>
                  
                </ion-col>
                <ion-col :size="isMobile() ? 12 : 2">
                  <ion-label>Time Zone
                    
                  </ion-label>
                  <multiselect
                    :options="searchFieldList"
                    :close-on-select="true"
                    v-model="selectedField"
                    open-direction="bottom"
                    placeholder="Select Time Zone"
                  />
                </ion-col>
                <ion-col :size="isMobile() ? 12 : 3">
                  <ion-label>Report to Run

                    
                  </ion-label>
                  <multiselect
                    :options="noOfDaysList"
                    :close-on-select="true"
                    v-model="selectedNoOfDays"
                    open-direction="bottom"
                    placeholder="Select Report"
                  />
                </ion-col>
                <ion-col :size="isMobile() ? 12 : 3">
                  <ion-button
                    @click="searchReturns()"
                    class="search-btn"
                  >
                     <ion-icon
                    :src="cdnImageURL('md-folder')"
                    slot="start"
                  /> View Report
                  </ion-button>
                   <ion-button
                 
                    @click="searchReturns()"
                    class="search-btn"
                  >
              <ion-icon
                    :src="cdnImageURL('md-download')"
                    slot="start"
                  /> Downloads
                  </ion-button>
                  
                </ion-col>
              </ion-row>
            </ion-card-content>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-card-content class="content-pane">
              <b-table
                :data="returns"
                default-sort-direction="asc"
                sort-icon="arrow-up"
                sort-icon-size="is-small"
                paginated
                per-page="10"
              >
                <template slot-scope="props">
                  <b-table-column
                    field="leadcloud_transaction_id"
                    label="Lead ID"
                  >
                    {{ props.row.leadcloud_transaction_id }}
                  </b-table-column>
                  <b-table-column
                    field="pi_first_name"
                    label="Name"
                    sortable
                  >
                    {{ props.row.pi_first_name }}
                    {{ props.row.pi_last_name }}
                  </b-table-column>
                  <b-table-column
                    field="pi_phone"
                    label="Phone No."
                  >
                    {{ props.row.pi_phone }}
                  </b-table-column>
                  <b-table-column
                    field="pi_email"
                    label="Email"
                    sortable
                  >
                    {{ props.row.pi_email }}
                  </b-table-column>
                  <b-table-column
                    field="received_date"
                    label="Date Received"
                    sortable
                  >
                    {{ getDateFormated(props.row.received_date) }}
                  </b-table-column>
                  <b-table-column
                    field="transaction_status"
                    label="Status"
                    sortable
                  >
                    <ion-text
                      :color="
                        getStatusOutput(props.row.transaction_status, 'color')
                      "
                    >
                      {{ getStatusOutput(props.row.transaction_status) }}
                    </ion-text>
                  </b-table-column>
                  <b-table-column>
                    <ion-buttons v-if="props.row.transaction_status === 1">
                      <ion-button
                        color="secondary"
                        @click="openReturn(props.row)"
                      >
                        <ion-icon :src="cdnImageURL('md-return-left')" />
                      </ion-button>
                    </ion-buttons>
                  </b-table-column>
                </template>
                <template slot="empty">
                  <div class="ion-text-center">
                    <div>
                      <ion-icon name="cloud-download"></ion-icon>
                    </div>
                    <h4 class="reports">Reports</h4>
                    <p class="para">Select a report and date range from the top and click "View Report" or "Download Report"</p>
                  </div>
                </template>
              </b-table>
            </ion-card-content>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>
<script>
// import returns from "../../data/returns.json";
import multiselect from 'vue-multiselect';
import ReportModal from '../../components/ReportModal/ReportModal.vue';
import utilityService from '../../services/utility.service';
 import Datepicker from 'vuejs-datepicker'
//  import { icons } from "@/assets/ionicons";
let vm;
export default {
  name: 'Report',
  data() {
    return {
       date: new Date(2020, 29,  10),
        date1: new Date(2020, 20,  10),
      returns: [],
      searchText: '',
      selectedField: 'Eastern',
      selectedNoOfDays: 'Bankrate Short Form Leads',
      searchFieldList: ['Eastern', 'Eastern', 'Eastern', 'Eastern', 'Eastern'],
      noOfDaysList: ['Bankrate Short Form Leads', 'LC Bankrate Short Form Leads', 'LC Bankrate Short Form Leads','Bankrate Short Form Leads'],
      transactionStatusList: [],
      // ionicons: icons
    };
  },
  components: {
    multiselect,
    Datepicker,
    // icons
  },
  methods: {
       getStatusOutput(color, key) {
      let result = '';
      if (key === 'color') {
        const mapColor = {
          1: 'success',
          2: 'primary',
          4: 'danger',
        };
        result = mapColor[color] || '';
      } else {
        const mapLabel = vm.transactionStatusList.reduce((acc, currStatus) => {
          acc[currStatus.TransactionStatusId] = currStatus.Status.toUpperCase();
          return acc;
        }, {});
        result = mapLabel[color] || '';
      }
      return result;
    },     
  },
  mounted() {
    vm.getTransactionStatus();
    vm.searchReturns();
  },
  created() {
    vm = this;
  },
};
</script>
<style>
.search-btn {
  margin: 10px !important;
 
}
 .reports{
    color: #f8c14d;
    font-size: 21px !important;   
    margin-bottom: 5px;
    font-weight: 600 !important;
  }
  .para {
  
    margin-bottom: 0;
        color: #7d7777;
         font-size: 13px !important;
  }
</style>
