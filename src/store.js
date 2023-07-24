import Vue from "vue";
import Vuex from "vuex";
import { auth } from "./module/auth";
import VuexPersist from "vuex-persist";
import { permissions } from "@/module/permissions";

const vuexLocalStorage = new VuexPersist({
  key: "vuex",
  storage: window.localStorage,
  reducer(val) {
    if (val.auth.token === "") {
      return {};
    }
    return val;
  },
  paths: ["auth"],
});

Vue.use(Vuex);
export const store = new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  state: {
    selectedModulesArray: [],

    isHovered: false,
  },

  modules: {
    auth,
    permissions
  },
});
