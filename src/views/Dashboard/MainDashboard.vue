<template>
  <flex-layout>
    <Details />
    <page-header heading="Home" action="Add New" />
    <div class="pt-24 px-24">
      <div class="row">

        <div class="col-md-3" v-for="(item, index) in this.projects" :key="index">
          <div class="card-dashboard">
            <h4 class="mt-4 text-white">{{ item.name }}</h4>
            <p class="fw-semibold text-white" v-html="item.description">
            </p>
          </div>
        </div>

        <!-- <div class="col-md-3">
          <div class="card-dashboard secondary">
            <p class="fw-semibold text-white">Total Requests</p>
            <h4 class="mt-4 text-white">1896</h4>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card-dashboard">
            <p class="fw-semibold text-white">Total Requests</p>
            <h4 class="mt-4 text-white">1896</h4>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card-dashboard secondary">
            <p class="fw-semibold text-white">Total Requests</p>
            <h4 class="mt-4 text-white">1896</h4>
          </div>
        </div> -->
      </div>
    </div>
    <default-table :tableData="tableData" :tableHeading="tableHeading" />
  </flex-layout>
</template>

<script>
// import AbsoluteLayout from "../../components/Layout/AbsoluteLayout.vue";
import FlexLayout from "../../components/Layout/FlexLayout.vue";
import Details from "../../components/Offcanvas/Details.vue";
import DefaultTable from "../../components/Table/DefaultTable.vue";
import PageHeader from "../../components/Utility/PageHeader.vue";
export default {
  name: "MainDashboard",
  components: {
    // AbsoluteLayout,
    PageHeader,
    FlexLayout,
    Details,
    DefaultTable,
  },
  data() {
    return {
      tableData: [
        {
          appliedDate: "10/13/2021",
          fullName: "Maddie Lindemann",
          department: "Marketing",
          email: "oivons0@t.co",
          phone: "942-780-9888",
          status: "Offline",
        },
        {
          appliedDate: "4/25/2022",
          fullName: "Laurie Cockrem",
          department: "Training",
          email: "hmcpherson1@booking.com",
          phone: "256-356-0918",
          status: "Offline",
        },
        {
          appliedDate: "10/12/2021",
          fullName: "Felita Mackison",
          department: "Human Resources",
          email: "aeldin2@reddit.com",
          phone: "227-409-7271",
          status: "Online",
        },
        {
          appliedDate: "9/14/2021",
          fullName: "Robin Goade",
          department: "Support",
          email: "gkenforth3@sun.com",
          phone: "290-694-0490",
          status: "Online",
        },
        {
          appliedDate: "1/4/2022",
          fullName: "Steven Clink",
          department: "Accounting",
          email: "ltoler4@pinterest.com",
          phone: "419-142-5176",
          status: "Deactivated",
        },
        {
          appliedDate: "1/18/2022",
          fullName: "Fraze Woodroofe",
          department: "Engineering",
          email: "ljulyan5@vkontakte.ru",
          phone: "937-959-9786",
          status: "Offline",
        },
        {
          appliedDate: "11/30/2021",
          fullName: "Fernande Lugg",
          department: "Product Management",
          email: "mfeltham6@google.cn",
          phone: "352-275-4954",
          status: "Deactivated",
        },
      ],
      tableHeading: [
        {
          heading: "Applied Date",
        },
        {
          heading: "Full Name",
        },
        {
          heading: "Department",
        },
        {
          heading: "Email Address",
        },
        {
          heading: "View",
        },
        {
          heading: "Status",
        },
      ],
      projects: [],
      api_url: process.env.VUE_APP_API_URL,
      storage: process.env.VUE_APP_API_STORAGE,
      url: "dashboard"
    };
  },
  mounted() {
    this.fetchHomeData();
  },
  methods: {
    fetchHomeData() {
      let uri = this.api_url + this.url;
      try {
        this.axios.get(uri).then(({ data }) => {
          console.log(data, "projects");
          this.projects = data.projects;
        });
      } catch (error) {
        console.log(error)
      }
    }
  },
};
</script>
