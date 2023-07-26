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
// import FlexLayout from "../Layout/FlexLayout.vue";
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
          title: "Projects",
          link: "/projects",
          hasSub: true,
          guard: "project",
          subMenu: [],
        },
        {
          title: "News & Notices",
          name: 'NewNotices',
          hasSub: true,
          subMenu: [
            {
              innerTitle: "News",
              link: "/news",
              guard: "news",
            },
            {
              innerTitle: "NoticeCategory",
              link: "/notice-category",
              guard: "noticecategory",
            },
            {
              innerTitle: "Notice",
              link: "/notice",
              guard: "notice",
            },
          ],
        },
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
          title: "Master Configuration",
          link: "/master-config",
          hasSub: false,
          guard: "user"
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
    // Fetch the dynamic subMenu items for "Projects" from the API
    async fetchProjectsSubMenu() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/projects');
        if (response.status === 200) {
          const projects = response.data.data;
          const subMenu = await Promise.all(projects.map(async (project) => {
            const folders = await this.fetchFolders(project.id);

            console.log("folders", folders);
            return {
              innerTitle: project.name,
              link: `/projects/${project.id}`,
              guard: "project",
              subMenu: folders,
            };
          }));
          this.menuList.find((item) => item.title === "Projects").subMenu = subMenu;
        }
      } catch (error) {
        console.error('Failed to fetch projects subMenu', error);
      }
    },

    // Fetch folders for a specific project ID
    async fetchFolders(projectId) {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/folders/${projectId}`); // Replace with your API endpoint for fetching folders
        if (response.status === 200) {
          const folders = response.data.data;
          return folders.map((folder) => {
            return {
              innerTitle: folder.name,
              link: `/folders/${folder.id}`,
              guard: "project",
              hasSub: true, // Assuming the same guard for all folder links
              subMenu: this.fetchSubfolders(folder.id), // Fetch subfolders recursively
            };
          });
        }
      } catch (error) {
        console.error(`Failed to fetch folders for project ID ${projectId}`, error);
        return [];
      }
    },

    // Recursively fetch subfolders for a specific folder ID
    async fetchSubfolders(folderId) {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/folders/${folderId}`); // Replace with your API endpoint for fetching subfolders
        if (response.status === 200) {
          const subfolders = response.data.data.subfolders;
          return subfolders.map((subfolder) => {
            return {
              innerTitle: subfolder.name,
              link: `/folders/${subfolder.id}`,
              guard: "project",
              hasSub: true, // Assuming the same guard for all subfolder links
              subMenu: this.fetchSubfolders(subfolder.id), // Fetch sub-subfolders recursively
            };
          });
        }
      } catch (error) {
        console.error(`Failed to fetch subfolders for folder ID ${folderId}`, error);
        return [];
      }
    },
  },
  created() {
    this.fetchProjectsSubMenu(); // Call the method to fetch the dynamic subMenu for "Projects" on component creation
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
