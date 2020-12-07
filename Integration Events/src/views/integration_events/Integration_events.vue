<template>
  <section>
    <ion-page>
      <ion-header class="lc-header">
        <ion-toolbar class="lc-header">
          <ion-title class="lc-header">
            Integration Events{{ data.start_date }}
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-card>
          <ion-card-content class="scroll_x">
            <ion-grid>
              <ion-row>
                <ion-col :size="isMobile() ? 12 : 3">
                  <ion-label>Campaign</ion-label>
                  <ion-input
                    placeholder="Campaign Id"
                    class="pt-7"
                  />
                </ion-col>
                <ion-col :size="isMobile() ? 12 : 3">
                  <ion-label>Integration</ion-label>
                  <ion-input
                    placeholder="Integration Id"
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
                  <ion-label>Start Date Start</ion-label>
                  <ion-input
                    type="datetime-local"
                    value="8978522"
                  />
                </ion-col>
                <ion-col :size="isMobile() ? 12 : 3">
                  <ion-label>Start Date End</ion-label>
                  <ion-input
                    type="datetime-local"
                    value="8978522"
                  />
                </ion-col>
                <ion-col :size="isMobile() ? 12 : 3">
                  <ion-label>Entered Date Start</ion-label>
                  <ion-input
                    type="datetime-local"
                  />
                </ion-col>
                <ion-col :size="isMobile() ? 12 : 3">
                  <ion-label>Entered Date End</ion-label>
                  <ion-input
                    type="datetime-local"
                  />
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col :size="isMobile() ? 12 : 3">
                  <ion-label>Entered By</ion-label>
                  <ion-input
                    placeholder="Enter By"
                    class="pt-7"
                  />
                </ion-col>
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
                  <ion-label>Search More Field</ion-label>
                  <multiselect
                    :options="searchriodlist"
                    :close-on-select="true"
                    v-model="selectedfieldField"
                    open-direction="bottom"
                    placeholder="Select Search Field"
                  />
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col :size="isMobile() ? 12 : 5">
                  <ion-label>Notes </ion-label>
                  <ion-textarea
                    placeholder="Enter Notes"
                  />
                </ion-col>
                <ion-col :size="isMobile() ? 12 : 4">
                  <ion-label>Internal Notes </ion-label>
                  <ion-textarea
                    placeholder="Enter Internal Notes"
                  />
                </ion-col>
                <ion-col
                  :size="isMobile() ? 12 : 3"
                  :class="aligncenter"
                >
                  <div class="aligncenter">
                    <ion-button color="primary">
                      Search Integration Events
                    </ion-button>
                  </div>
                </ion-col>
              </ion-row>
            </ion-grid>
            <ion-grid>
              <ion-row>
                <ion-col :size="isMobile() ? 12 : 12">
                  <b-table
                    :data="data"
                    :columns="columns"
                    :sticky-header="stickyHeaders"
                    :height="500"
                  />
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-card-content>
        </ion-card>
      </ion-content>
    </ion-page>
  </section>
</template>
<script>
import multiselect from 'vue-multiselect';
// import 'buefy/dist/buefy.css';

export default {
  components: {
    multiselect,
  },
  data() {
    return {
      selectedfieldField: 'Select Search Field',
      searchriodlist: ['Seller Notified', 'Buyer Notified', 'Revenue Loss Lead Cloud', 'Revenue Loss Seller', 'Revenue Loss Buyer', 'Lead Cloudc At Fault'],
      selectedField: 'Select Event Type',
      searchFieldList: ['System Outage', 'Significant Change', 'State Expansion', 'Filter Change', 'Event of Interest'],
      selectedSeller: 'Select Seller',
      searchsellerList: ['Seller1', 'Seller2', 'Seller3', 'Seller4', 'Seller5'],
      selectedBuyer: 'Select Buyer',
      searchBuyerList: ['Buyer1', 'Buyer2', 'Buyer3', 'Buyer4', 'Buyer5'],
      data: [
        {
          start_date: '1994-12-15 01:00 AM', end_date: '1995-01-15 12:00 AM', event_type: 'Significant Change', entered_by: 'Chris', revenue_loss_lead_cloud: 'No', notes: 'Lorem Ipsum is simply dummy text of the printing ', fggd: '',
        },
        {
          start_date: '1994-12-15 01:00 AM', end_date: '1995-01-15 12:00 AM', event_type: 'Significant Change', entered_by: 'Chris', revenue_loss_lead_cloud: 'No', notes: 'Lorem Ipsum is simply dummy text of the printing ', fggd: '',
        },
        {
          start_date: '1994-12-15 01:00 AM', end_date: '1995-01-15 12:00 AM', event_type: 'Significant Change', entered_by: 'Chris', revenue_loss_lead_cloud: 'No', notes: 'Lorem Ipsum is simply dummy text of the printing', fggd: '',
        },
        {
          start_date: '1994-12-15 01:00 AM', end_date: '1995-01-15 12:00 AM', event_type: 'Significant Change', entered_by: 'Chris', revenue_loss_lead_cloud: 'No', notes: 'Lorem Ipsum is simply dummy text of the printing ', fggd: '',
        },
        {
          start_date: '1994-12-15 01:00 AM', end_date: '1995-01-15 12:00 AM', event_type: 'Significant Change', entered_by: 'Chris', revenue_loss_lead_cloud: 'No', notes: 'Lorem Ipsum is simply dummy text of the printing ', fggd: '',
        },
        {
          start_date: '1994-12-15 01:00 AM', end_date: '1995-01-15 12:00 AM', event_type: 'Significant Change', entered_by: 'Chris', revenue_loss_lead_cloud: 'No', notes: 'Lorem Ipsum is simply dummy text of the printing', fggd: '',
        },
        {
          start_date: '1994-12-15 01:00 AM', end_date: '1995-01-15 12:00 AM', event_type: 'Significant Change', entered_by: 'Chris', revenue_loss_lead_cloud: 'No', notes: 'Lorem Ipsum is simply dummy text of the printing', fggd: '',
        },
        {
          start_date: '1994-12-15 01:00 AM', end_date: '1995-01-15 12:00 AM', event_type: 'Significant Change', entered_by: 'Chris', revenue_loss_lead_cloud: 'No', notes: 'Lorem Ipsum is simply dummy text of the printing ', fggd: '',
        },
        {
          start_date: '1994-12-15 01:00 AM', end_date: '1995-01-15 12:00 AM', event_type: 'Significant Change', entered_by: 'Chris', revenue_loss_lead_cloud: 'No', notes: 'Lorem Ipsum is simply dummy text of the printing ', fggd: '',
        },
      ],
      stickyHeaders: true,
      dateSearchable: false,
    };
  },
  computed: {
    columns() {
      return [
        {
          field: 'start_date',
          label: 'Start Date',
        },
        {
          field: 'end_date',
          label: 'End Date',
          centered: true,
        },
        {
          field: 'event_type',
          label: 'Event Type',
          centered: true,
        },
        {
          field: 'entered_by',
          label: 'Entered By',
          centered: true,
        },
        {
          field: 'revenue_loss_lead_cloud',
          label: 'Revenue Loss Lead Cloud',
          centered: true,
        },
        {
          field: 'notes',
          label: 'Notes',
          centered: true,
        },
        {
          field: 'fggd',
          label: '',
          centered: true,
        },
      ];
    },
  },
};
</script>
<style>
.scroll_x .table-wrapper thead tr th.is-unselectable {
      white-space: nowrap;
}
.scroll_x .table-wrapper tbody tr td {
          width: 14%;
}
.scroll_x .table-wrapper tbody tr td:last-child {
          width: 300px;
}
.scroll_x .table-wrapper tbody tr td:nth-last-child(2) {
        text-align: center;
}
.scroll_x .table-wrapper tbody tr td:nth-last-child(3) {
        text-align: center;
}
.scroll_x .table-wrapper tbody tr td:nth-last-child(4) {
        text-align: center;
}
.scroll_x .table-wrapper tbody tr td:nth-last-child(5) {
        text-align: center;
}
.is-sticky-column-one {
    background: #23d160 !important;
    color: white !important;
}
.is-sticky-column-two {
    background: #167df0 !important;
    color: white !important;
}
.aligncenter {
height: 79px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>>
