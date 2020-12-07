<template>
  <section>
    <ion-page>
      <ion-header class="lc-header">
        <ion-toolbar class="lc-header">
          <ion-title class="lc-header">
            Consent Language
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
                    :data="consentLanguageList"
                    :mobile-cards="hasMobileCards"
                    :paginated="isPaginated"
                    :per-page="perPage"
                    :pagination-simple="isPaginationSimple"
                    :sort-icon="sortIcon"
                    :sort-icon-size="sortIconSize"
                    default-sort="VersionNumber"
                  >
                    <template slot-scope="props">
                      <b-table-column
                        field="VersionNumber"
                        label="Version Number"
                        sortable
                      >
                        {{ props.row.VersionNumber }}
                      </b-table-column>

                      <b-table-column
                        field="portal_Id"
                        label="Portal Id"
                        sortable
                      >
                        {{ props.row.portal_Id }}
                      </b-table-column>
                      <b-table-column
                        field="current_version"
                        label="Current Version"
                        sortable
                      >
                        {{ props.row.current_version }}
                      </b-table-column>
                      <b-table-column
                        field="created_by"
                        label="Created By"
                      >
                        {{ props.row.created_by }}
                      </b-table-column>
                      <b-table-column
                        field="created_date"
                        label="Created Date"
                        sortable
                      >
                        <span v-html="formatDate(props.row.created_date)" />
                      </b-table-column>
                      <b-table-column
                        field="consent_text"
                        label="Consent Text"
                        sortable
                      >
                        <ion-button
                          color="primary"
                          @click="confirmCustom"
                        >
                          View
                        </ion-button>
                      </b-table-column>
                      <b-table-column
                        field=""
                        label=""
                      >
                        <b-button
                          type="is-text"
                          size="is-medium"
                        >
                          <ion-icon :src="cdnImageURL('md-create')" />
                        </b-button>
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
import consentLanguageList from '../../data/consentlanguagelist.json';
import 'buefy/dist/buefy.css';

export default {
  data() {
    return {
      consentLanguageList,
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
    confirmCustom() {
      this.$buefy.dialog.confirm({
        title: 'Consent Text',
        message: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Fusce id fermentum quam. Proin sagittis,
                        nibh id hendrerit imperdiet, elit sapien laoreet elit,
                        ac scelerisque diam velit in nisl. Nunc maximus ex non
                        laoreet semper. Nunc scelerisque, libero sit amet pretium dignissim,
                        augue purus placerat justo,
                        sit amet porttitor dui metus in nisl.
                        Nulla non leo placerat, porta metus eu, laoreet risus.
                        Etiam lacinia, purus eu luctus maximus, elit ex viverra tellus,
                        sit amet sodales quam dui nec odio.</p>
                        <p>
                        <br/>
                        Nullam porta mollis est. Quisque aliquet malesuada fringilla.
                        Pellentesque volutpat lacus at ante posuere,
                        non pulvinar ante porta. Proin viverra eu massa nec porta.
                        Aliquam rhoncus velit quis sem hendrerit,
                        ut dictum nisl accumsan. Maecenas erat enim, scelerisque non ligula ac,
                        eleifend venenatis ligula.</p>
                        <br/>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Fusce id fermentum quam. Proin sagittis,
                        nibh id hendrerit imperdiet, elit sapien laoreet elit,
                        ac scelerisque diam velit in nisl. Nunc maximus ex non
                        laoreet semper. Nunc scelerisque, libero sit amet pretium dignissim,
                        augue purus placerat justo,
                        sit amet porttitor dui metus in nisl.
                        Nulla non leo placerat, porta metus eu, laoreet risus.
                        Etiam lacinia, purus eu luctus maximus, elit ex viverra tellus,
                        sit amet sodales quam dui nec odio.</p>
                        <p> <br/>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Fusce id fermentum quam. Proin sagittis,
                        nibh id hendrerit imperdiet, elit sapien laoreet elit,
                        ac scelerisque diam velit in nisl. Nunc maximus ex non
                        laoreet semper. Nunc scelerisque, libero sit amet pretium dignissim,
                        augue purus placerat justo,
                        sit amet porttitor dui metus in nisl.
                        Nulla non leo placerat, porta metus eu, laoreet risus.
                        Etiam lacinia, purus eu luctus maximus, elit ex viverra tellus,
                        sit amet sodales quam dui nec odio.</p>
                        <p> <br/>
                        Praesent molestie mauris sed elit posuere, non malesuada libero gravida.
                        In hac habitasse platea dictumst.
                        Pellentesque habitant morbi tristique senectus
                        et netus et malesuada fames ac turpis egestas.</p>`,
        cancelText: 'Disagree',
        confirmText: 'Agree',
        type: 'is-success',
        onConfirm: () => this.$buefy.toast.open('User agreed'),
      });
    },
  },
};
</script>
