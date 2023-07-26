import Vue from "vue";
import Router from "vue-router";
import VueAxios from "vue-axios";
import axios from "axios";
import Login from "../views/Login/Login.vue";
import Main from "../views/Dashboard/index.vue";
import MainDashboard from "../views/Dashboard/MainDashboard.vue";
import UserManagement from "@/views/User/index.vue";
import RoleSetup from "@/views/RoleSetup/index.vue";
import UserRole from "@/views/UserRole/index.vue";
import Activity from "@/views/Activity/index.vue";
import Project from "@/views/Project/index.vue";

import { store } from "../store.js";

Vue.use(Router);
Vue.use(VueAxios, axios);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/");
};

const ifAuthorized = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    if (to.meta.guard == "home") {
      next();
    } else if (
      store.getters.getPermissions.indexOf(to.meta.guard + "." + "view") !== -1
    ) {
      next();
    } else {
      next({ path: "", replace: true });
    }
  } else {
    return next("/login");
  }
};

const router = new Router({
  linkExactActiveClass: "active",
  mode: "history",
  routes: [
    {
      path: "/",
      component: Main,
      children: [
        {
          path: "",
          name: "MainDashboard",
          component: MainDashboard,
          beforeEnter: ifAuthorized,
          meta: { guard: "home" },
        },
        {
          path: "/users",
          name: "Users",
          component: UserManagement,
          beforeEnter: ifAuthorized,
          meta: { guard: "user" },
        },
        {
          path: "/role-setup",
          name: "RoleSetup",
          component: RoleSetup,
          beforeEnter: ifAuthorized,
          meta: { guard: "user" },
        },
        {
          path: "/user-role",
          name: "UserRole",
          component: UserRole,
          beforeEnter: ifAuthorized,
          meta: { guard: "user" },
        },
        {
          path: "/activity",
          name: "Activity",
          component: Activity,
          beforeEnter: ifAuthorized,
          meta: { guard: "activity" },
        },
        {
          path: "/projects",
          name: "Projects",
          component: Project,
          beforeEnter: ifAuthorized,
          meta: { guard: "project" },
        },
      ],
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      beforeEnter: ifNotAuthenticated,
    },
    { path: "*", redirect: "/" },
  ],
});

export default router;
