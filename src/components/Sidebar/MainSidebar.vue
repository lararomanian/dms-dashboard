<template>
  <div class="sidebar-01" :class="{ toggled: isToggled }">
    <div class="position-relative h-100">
      <absolute-layout :scrollable="true">
        <ul class="sidebar-01-list">
          <template v-for="data in menuList">
            <template v-if="data.hasSub && menuGuard(data, data.hasSub)">
              <li :key="data.index" :class="{ hasSub: data.hasSub }">
                <a type="button" data-bs-toggle="collapse" :data-bs-target="'#multiCollapseExample2_' + data.name"
                  aria-expanded="false" :aria-controls="'multiCollapseExample2_' + data.name">
                  {{ data.title }}
                </a>
                <div class="collapse multi-collapse" :id="'multiCollapseExample2_' + data.name">
                  <div class="card">
                    <template v-for="item in data.subMenu">
                      <router-link :to="item.link" v-if="menuGuard(item)" :key="item.index">
                        {{ item.innerTitle }}
                      </router-link>
                    </template>
                  </div>
                </div>
              </li>
            </template>
            <template v-else-if="menuGuard(data)">
              <li :key="data.index" :class="{ hasSub: data.hasSub }">
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
        // {
        //   title: "Document Management",
        //   hasSub: false,
        //   link: "/documents",
        //   guard: "project",
        // },
        {
          title: "Project Users",
          link: "/project-users",
          hasSub: false,
          guard: "user",
        },
        {
          title: "Users",
          link: "/users",
          hasSub: false,
          guard: "user",
        },
        {
          title: "Role Management",
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
      if (menu.guard == "home") {
        return true;
      }
      if (hasSub == true) {
        let active = false;
        menu.subMenu.forEach((el) => {
          if (
            this.$store.getters.getPermissions.indexOf(
              el.guard + "." + "view"
            ) !== -1
          ) {
            active = true;
          }
        });
        return active;
      } else {
        return (
          this.$store.getters.getPermissions.indexOf(
            menu.guard + "." + "view"
          ) !== -1
        );
      }
    },
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
