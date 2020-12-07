<template>
  <section>
    <ion-page>
      <ion-header class="lc-header">
        <ion-toolbar class="lc-header">
          <ion-title class="lc-header">
            Consent Language History
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-card>
          <ion-card-content class="scroll_x">
            <ion-grid>
              <ion-row>
                <ion-col :size="isMobile() ? 12 : 12">
                  <b-table
                    :data="languageHistoryList"
                    :mobile-cards="hasMobileCards"
                    :pagination-simple="isPaginationSimple"
                  >
                    <template slot-scope="props">
                      <b-table-column
                        field="user"
                        label="User"
                        sortable
                      >
                        {{ props.row.user }}
                      </b-table-column>

                      <b-table-column
                        field="VersionNumber"
                        label="Version Number"
                        sortable
                      >
                        {{ props.row.VersionNumber }}
                      </b-table-column>
                      <b-table-column
                        field="actiondate"
                        label="Action Date"
                        sortable
                      >
                        <span v-html="formatDate(props.row.actiondate)" />
                      </b-table-column>

                      <b-table-column
                        field="agreed"
                        label="Agreed"
                      >
                        {{ props.row.agreed }}
                      </b-table-column>
                      <b-table-column
                        field="ipaddress"
                        label="IP Address"
                        sortable
                      >
                        {{ props.row.ipaddress }}
                      </b-table-column>
                      <b-table-column
                        field="actionURL"
                        label="Action URL"
                        sortable
                      >
                        {{ props.row.actionURL }}
                      </b-table-column>
                    </template>
                  </b-table>
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
import languageHistoryList from '../../data/consentlanguagehistory.json';

export default {
  data() {
    return {
      languageHistoryList,
      hasMobileCards: true,
      isPaginated: true,
      isPaginationSimple: false,
      perPage: 10,
    };
  },
  methods: {
    formatDate(value) {
      return `<span>
                    ${new Date(value).toLocaleDateString()}
                </span>`;
    },
  },
};
</script>
