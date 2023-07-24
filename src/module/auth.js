import router from "../router/index";

export const auth = {
  state: {
    user: {},
    token: "",
  },
  getters: {
    authUser(state) {
      return state.user;
    },
    getToken(state) {
      return state.token;
    },
    isAuthenticated(state) {
      if (state.token != "" && Object.keys(state.user).length != 0) return true;

      return false;
    },
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },

    LOG_OUT(state) {
      state.user = {};
      state.token = "";
      router.push("/login");
    },
  },

  actions: {
    setUser({ commit }, user) {
      commit("SET_USER", user);
    },
    setToken({ commit }, token) {
      commit("SET_TOKEN", token);
    },
  },
};
