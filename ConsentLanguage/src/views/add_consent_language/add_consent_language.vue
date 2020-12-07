<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar class="header-btn">
        <ion-title>
          Add Consent Language
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card style="position: inherit; overflow:visible;">
        <ion-card-content>
          <ion-grid>
            <ion-row>
              <ion-col :size="isMobile() ? 12 : 4">
                <ion-label>Version Number </ion-label>
                <ion-input
                  placeholder="VersionNumber"
                />
              </ion-col>
              <ion-col :size="isMobile() ? 12 : 4">
                <ion-label>Portal Id</ion-label>
                <ion-input
                  placeholder="Portal Id"
                />
              </ion-col>
              <ion-col
                :size="isMobile() ? 12 : 2"
                class="dflex"
              >
                <ion-item>
                  <ion-label>Current Version</ion-label>
                </ion-item>
              </ion-col>
              <ion-col
                :size="isMobile() ? 12 : 2"
                class="dflex"
              >
                <ion-item>
                  <ion-toggle color="primary" />
                </ion-item>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col :size="isMobile() ? 12 : 12">
                <div class="ion-margin-bottom">
                  <ion-label>
                    Consent Text
                  </ion-label>
                </div>
                <ejs-richtexteditor
                  ref="rteObj"
                  :toolbar-settings="toolbarSettings"
                  :height="250"
                  placeholder="Consent Text"
                />
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col class="text-center">
                <ion-button color="primary">
                  Add Consent Language
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
import Vue from 'vue';
import {
  RichTextEditorPlugin, Toolbar, HtmlEditor,
} from '@syncfusion/ej2-vue-richtexteditor';

Vue.use(RichTextEditorPlugin);
export default {
  provide: {
    richtexteditor: [Toolbar, HtmlEditor],
  },
  name: 'AddConsentLangauge',
  components: {
  },
  data() {
    return {
    };
  },
};
</script>
