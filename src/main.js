import Vue from "vue";
import App from "./App.vue";
// import CKEditor from 'ckeditor4-vue';
import "./filters/stripHTML.js";
import "./filters/stripSlug.js";

import "./assets/icon.css";
Vue.config.productionTip = false;
Vue.config.silent;
import router from "./router";
import { store } from "./store";
import "./vuex-axios.js";
import PortalVue from "portal-vue";
Vue.use(PortalVue);
import Toast from "vue-toastification";
import Multiselect from "vue-multiselect";
Vue.component("multiselect", Multiselect);
import "vue-multiselect/dist/vue-multiselect.min.css";
import "vue-toastification/dist/index.css";
import Paginate from "vuejs-paginate";
Vue.use(Toast);
// Vue.use(CKEditor);
import Permissions from "./mixins/Permissions.vue";
Vue.mixin(Permissions);


Vue.component("paginate", Paginate);

new Vue({
  router,
  watch: {
    $route: {
      handler: function () {
        if (store.getters.isAuthenticated == true) {
          this.axios
            .get(process.env.VUE_APP_API_URL + "abilities")
            .then((res) => {
              this.$store.dispatch("setPermissions", res.data.permissions);
            });
        }
      },
      deep: true,
      immediate: true,
    },
  },
  store,
  render: (h) => h(App),
}).$mount("#app");
