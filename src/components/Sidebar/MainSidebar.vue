<template>
  <div class="sidebar-01" :class="{ toggled: isToggled }">
    <div class="position-relative h-100">
      <absolute-layout :scrollable="true">
        <ul class="sidebar-01-list">
          <template v-for="data in menuList">
            <template v-if="data.hasSub && menuGuard(data, data.hasSub)">
              <li :key="data.title" class="hasSub">
                <a type="button" data-bs-toggle="collapse" :data-bs-target="'#multiCollapseExample2_' + data.title"
                  aria-expanded="false" :aria-controls="'multiCollapseExample2_' + data.title">
                  {{ data.title }}
                </a>
                <div class="collapse multi-collapse" :id="'multiCollapseExample2_' + data.title">
                  <div class="card">
                    <template v-for="item in data.subMenu">
                      <router-link :to="item.link" :key="item.innerTitle" v-if="menuGuard(item)">
                        {{ item.innerTitle }}
                      </router-link>
                    </template>
                  </div>
                </div>
              </li>
            </template>
            <template v-else-if="menuGuard(data)">
              <li :key="data.title" class="hasSub">
                <router-link :to="data.link"> {{ data.title }} </router-link>
              </li>
            </template>
          </template>
        </ul>
      </absolute-layout>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AbsoluteLayout from "../Layout/AbsoluteLayout.vue";

export default {
  name: "AppSidebar",
  components: { AbsoluteLayout },
  props: { isToggled: Boolean },
  data() {
    return {
      menuList: [
        {
          title: "Home",
          link: "/",
          guard: "home",
          hasSub: false,
        },
        {
          title: "Projects Management",
          hasSub: false,
          link: "/projects",
          guard: "project",
        },
        {
          title: "Projects",
          hasSub: true,
          subMenu: [], // Initialize the subMenu array to an empty array
        },
        // {
        //   title: "Document Management",
        //   hasSub: false,
        //   link: "/documents",
        //   guard: "project",
        // },
        {
          title: "Role Management",
          name: "role_management",
          hasSub: true,
          subMenu: [
            {
              innerTitle: "Role Setup",
              link: "/role-setup",
              guard: "user",
            },
            {
              innerTitle: "User Role",
              link: "/user-role",
              guard: "user",
            },
          ],
        },
        {
          title: "Users",
          link: "/users",
          hasSub: false,
          guard: "user",
        },
        // {
        //   title: "Activity Log",
        //   link: "/activity",
        //   hasSub: false,
        //   guard: "activity",
        // },
      ],
    };
  },
  methods: {
    menuGuard(menu, hasSub = false) {
      if (menu.guard === "home") {
        return true;
      }
      if (hasSub) {
        return menu.subMenu.some((item) => this.$store.getters.getPermissions.indexOf(item.guard + ".view") !== -1);
      } else {
        return this.$store.getters.getPermissions.indexOf(menu.guard + ".view") !== -1;
      }
    },
    async fetchProjects() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/documents/all');
        if (response.status === 200) {
          const projects = response.data.data;
          // Map the projects data to the submenu format
          const subMenu = projects.map((project) => ({
            innerTitle: project.name,
            link: `/projects/${project.id}`,
            guard: project.name.toLowerCase(),
          }));
          // Find the index of the "Projects" menu item in menuList
          const projectsIndex = this.menuList.findIndex((item) => item.title === "Projects");
          // Update the "Projects" submenu with the fetched data using Vue.set
          this.$set(this.menuList[projectsIndex], 'subMenu', subMenu);
        }
      } catch (error) {
        console.error('Failed to fetch projects data', error);
      }
    },

  },
  created() {
    this.fetchProjects(); // Call the method to fetch the projects data on component creation
  },
};
</script>

<style lang="scss" scoped>
// @import "../../assets/scss/main";
.sidebar-01-list>li.hasSub .card .active {
  color: rgb(255, 255, 255);
  font-weight: 600;
}
</style>
