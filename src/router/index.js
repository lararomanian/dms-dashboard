import Vue from "vue";
import Router from "vue-router";
import VueAxios from "vue-axios";
import axios from "axios";
import Login from "../views/Login/Login.vue";
import Main from "../views/Dashboard/index.vue";
import MainDashboard from "../views/Dashboard/MainDashboard.vue";
import Complaint from "../views/Complaints/Complaint.vue";
import MasterConfig from "../views/MasterConfig/index.vue";
import FormElement from "../views/FormElement/index.vue";
import PopUp from "../views/PopUp/index.vue";
import Carousel from "../views/Carousel/index.vue";
import DownloadCategory from "../views/DownloadCategory/index.vue";
import Download from "../views/Download/index.vue";
import Menus from "../views/Menus/index.vue";
import News from "../views/News/index.vue";
import NoticeCategory from "../views/NoticeCategory/index.vue";
import Notice from "../views/Notice/index.vue";
import Member from "../views/Member/index.vue";
import FooterLink from "@/views/FooterLink/index.vue";
import OfficeInformation from "@/views/OfficeInformation/index.vue";
import UserManagement from "@/views/User/index.vue";
import RoleSetup from "@/views/RoleSetup/index.vue";
import UserRole from "@/views/UserRole/index.vue";
import Activity from "@/views/Activity/index.vue";

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
          path: "complaint",
          name: "Complaint",
          component: Complaint,
          meta: { guard: "complaint" },
          beforeEnter: ifAuthorized,
        },
        {
          path: "master-config",
          name: "MasterConfig",
          component: MasterConfig,
          beforeEnter: ifAuthorized,
        },
        {
          path: "form-element",
          name: "FormElement",
          component: FormElement,
          beforeEnter: ifAuthorized,
        },
        {
          path: "popup",
          name: "PopUp",
          component: PopUp,
          meta: { guard: "popup" },
          beforeEnter: ifAuthorized,
        },
        {
          path: "carousel",
          name: "Carousel",
          component: Carousel,
          meta: { guard: "carousel" },
          beforeEnter: ifAuthorized,
        },
        {
          path: "download-category",
          name: "DownloadCategory",
          component: DownloadCategory,
          meta: { guard: "downloadcategory" },
          beforeEnter: ifAuthorized,
        },
        {
          path: "download",
          name: "Download",
          component: Download,
          meta: { guard: "download" },
          beforeEnter: ifAuthorized,
        },
        {
          path: "menus",
          name: "Menus",
          component: Menus,
          meta: { guard: "menu" },
          beforeEnter: ifAuthorized,
        },
        {
          path: "news",
          name: "News",
          component: News,
          meta: { guard: "news" },
          beforeEnter: ifAuthorized,
        },
        {
          path: "notice-category",
          name: "NoticeCategory",
          component: NoticeCategory,
          meta: { guard: "noticecategory" },
          beforeEnter: ifAuthorized,
        },
        {
          path: "notice",
          name: "Notice",
          component: Notice,
          meta: { guard: "notice" },
          beforeEnter: ifAuthorized,
        },
        {
          path: "member",
          name: "Member",
          component: Member,
          meta: { guard: "member" },
          beforeEnter: ifAuthorized,
        },
        {
          path: "/footer-links",
          name: "FooterLink",
          component: FooterLink,
          meta: { guard: "footerlink" },
          beforeEnter: ifAuthorized,
        },
        {
          path: "/office-information",
          name: "OfficeInformation",
          component: OfficeInformation,
          meta: { guard: "officeinformation" },
          beforeEnter: ifAuthorized,
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
