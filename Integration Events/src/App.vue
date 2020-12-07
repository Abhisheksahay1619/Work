<template>
  <div>
    <ion-split-pane when="md">
      <ion-menu side="start">
        <ion-header class="menu-header">
          <ion-toolbar />
        </ion-header>
        <ion-content class="lc-menu">
          <ion-list
            class="lc-menu-list menu-items"
            @click="closeMenu()"
          >
            <ion-menu-toggle auto-hide="false">
              <div
                class="menu-item"
                :class="{ active: activeItem == 'app.Integration_events' }"
              >
                <ion-item @click="goToView('Integration_events')">
                  <ion-icon
                    :src="cdnImageURL('md-search')"
                    slot="start"
                  />
                  <ion-label>
                    Integration Events
                  </ion-label>
                </ion-item>
              </div>
              <div
                class="menu-item"
                :class="{ active: activeItem == 'app.Add_integration_events' }"
              >
                <ion-item @click="goToView('Add_integration_events')">
                  <ion-icon
                    :src="cdnImageURL('md-add')"
                    slot="start"
                  />
                  <ion-label>
                    Add Events
                  </ion-label>
                </ion-item>
              </div>
            </ion-menu-toggle>
          </ion-list>
        </ion-content>
      </ion-menu>
      <div
        class="ion-page"
        id="application-content"
        main
      >
        <div
          id="loader"
          style="display: none"
        >
          <img>
        </div>
        <ion-buttons class="max-width-50">
          <ion-menu-toggle
            auto-hide="width >= 768 ? ture : false"
            color="black"
          >
            <img
              :src="cdnImageURL('md-menu')"
              class="ion-menu-toggle-src"
            >
          </ion-menu-toggle>
        </ion-buttons>
        <router-view :key="$route.fullPath" />
      </div>
    </ion-split-pane>
    <ion-menu-controller />
  </div>
</template>
<script>
import AppService from './App.service';

let vm;
export default {
  name: 'App',
  data() {
    return {
      activeItem: '',
    };
  },
  methods: {
    closeMenu() {
      document.querySelector('ion-menu-controller').close();
    },
    goToView(view) {
      AppService.goToView(vm, view);
    },
  },
  watch: {
    $route(to) {
      vm.activeItem = to.name;
    },
  },
  mounted() {
    vm.activeItem = vm.$route.name;
  },
  created() {
    vm = this;
  },
};
</script>
<style>
@import "../node_modules/@ionic/core/css/ionic.bundle.css";
@import "assets/css/variable.ionic.css";
@import "assets/css/ionic-overwrites/ionic-alert.css";
@import "assets/css/ionic-overwrites/ionic-button.css";
@import "assets/css/ionic-overwrites/ionic-card.css";
@import "assets/css/ionic-overwrites/ionic-list.css";
@import "assets/css/ionic-overwrites/ionic-content.css";
@import "assets/css/ionic-overwrites/ionic-item.css";
@import "assets/css/ionic-overwrites/ionic-menu.css";
@import "assets/css/ionic-overwrites/ionic-header.css";
@import "assets/css/ionic-overwrites/ionic-footer.css";
@import "assets/css/ionic-overwrites/ionic-loading.css";
@import "assets/css/ionic-overwrites/ionic-modal.css";
@import "assets/css/ionic-overwrites/ionic-popover.css";
@import "assets/css/table.css";
@import "assets/css/busernet-styles-v0009.css";
</style>
