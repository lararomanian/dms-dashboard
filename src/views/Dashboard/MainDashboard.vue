<template>
  <flex-layout>
    <Details />
    <page-header heading="Home" action="Add New" />
    <div class="dashboard-content">
      <div class="row">
        <div class="col-md-3" v-for="(item, index) in projects" :key="index">
          <router-link :to="'projects/' +item.id">
          <div class="card-dashboard" v-if="$can(item.name.toLowerCase() + '.view')">
            <h4 class="mt-4 text-white">{{ item.name }}</h4>
            <p class="fw-semibold text-white" v-html="item.description"></p>
            <!-- Add more fields here as needed -->
          </div>
          </router-link>
        </div>
      </div>
    </div>
  </flex-layout>
</template>

<script>
import FlexLayout from "../../components/Layout/FlexLayout.vue";
import Details from "../../components/Offcanvas/Details.vue";
import PageHeader from "../../components/Utility/PageHeader.vue";

export default {
  name: "MainDashboard",
  components: {
    PageHeader,
    FlexLayout,
    Details,
  },
  data() {
    return {
      tableData: [
        // Your table data here
      ],
      tableHeading: [
        // Your table heading here
      ],
      projects: [],
      api_url: process.env.VUE_APP_API_URL,
      storage: process.env.VUE_APP_API_STORAGE,
      url: "dashboard",
    };
  },
  mounted() {
    this.fetchHomeData();
  },
  methods: {
    fetchHomeData() {
      const uri = `${this.api_url}${this.url}`;
      try {
        this.axios.get(uri).then(({ data }) => {
          console.log(data, "projects");
          this.projects = data.projects;
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard-content {
  padding-top: 24px;
  padding-right: 24px;
  padding-bottom: 24px;
  padding-left: 24px;
}

.card-dashboard {
  padding: 1.5rem;
  background-color: #053f88;
  border-radius: 0.35rem;
  color: #fff;
  min-height: 150px;

  h4 {
    margin-top: 1rem;
    color: #fff;
  }

  p {
    font-weight: 600;
    color: #fff;
  }
}
</style>
