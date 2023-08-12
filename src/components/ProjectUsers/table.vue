<template>
    <flex-layout styleClasses="p-24">
      <!-- Table Query Component -->
      <TableQuery :params="params" :sorts="sorts" :resetFilters="resetFilters" :sortBy="sortBy" />
  
      <div class="position-relative h-100">
        <!-- Absolute Layout Wrapper with Responsive Table -->
        <absolute-layout :scrollable="true" styleClass="table-responsive">
          <table class="table table-01" width="50%">
            <thead>
              <!-- Table Header -->
              <th v-for="item in tableHeading" :key="item.index">
                {{ item.heading }}
              </th>
              <th>Actions</th>
            </thead>
            <!-- Loading Spinner -->
            <Spinner v-if="isLoading" />
            <!-- Table Data -->
            <TableData :tableData="tableData" v-else>
              <tr v-for="item in tableData" :key="item.index">
                <!-- Display User Name -->
                <td>
                  {{ item.name }}
                </td>
  
                <!-- Display Project Users -->
                <td>
                  <span v-for="user in item.project_users" :key="user.index" class="btn btn-secondary mr-2 rounded-pill badge" >
                    <span>
                      {{ user.name }}
                    </span>  
                  </span>
                </td>
  
                <!-- Action Buttons -->
                <td class="action">
                  <!-- Edit Button -->
                  <button
                    title="Edit"
                    class="btn btn-sm btn-gray"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasCreate"
                    aria-controls="offcanvasCreate"
                    @click.prevent="setEditData(item)"
                    v-if="$can($route.meta.guard + '.update')"
                  >
                    <i class="ic-edit"></i>
                  </button>
                  <!-- Delete Button -->
                  <button
                    title="Delete"
                    class="btn btn-sm btn-gray"
                    @click="deleteData(item.id)"
                    v-if="$can($route.meta.guard + '.delete')"
                  >
                    <i class="ic-delete"></i>
                  </button>
                </td>
              </tr>
            </TableData>
          </table>
          <!-- Table Footer -->
          <!-- <div class="table-footer">
            <PerPage :options="options" :params="params" />
            <paginate
              :page-class="'page-item'"
              :page-count="pageCount"
              :page-link-class="'page-link'"
              :container-class="'pagination  pagination-sm'"
              :prev-text="`<i class='ic-chevron-left'></i>`"
              :next-text="` <i class='ic-chevron-right'></i>`"
              :prev-class="'page-link pagination-arrow mr-2'"
              :next-class="'page-link pagination-arrow ml-2'"
              :click-handler="handlePagination"
              ref="paginate"
            ></paginate>
          </div> -->
        </absolute-layout>
      </div>
    </flex-layout>
  </template>
  
  <script>
  // Import Statements
  
  export default {
    name: 'ProjectUsersTable',
    // Other component properties (e.g., props, data, etc.)
  
    // Component Lifecycle Hooks
  
    methods: {
      // Methods
    },
  };
  </script>
  
<script>
import axios from "axios";
import AbsoluteLayout from "@/components/Layout/AbsoluteLayout.vue";
import FlexLayout from "@/components/Layout/FlexLayout.vue";
// import PaginationMixin from "@/mixins/pagination.vue";
// import PerPage from "@/components/Utility/PerPage.vue";
import TableMixin from "@/mixins/table.vue";
import Spinner from "@/components/Utility/Spinner.vue";
import TableQuery from "@/components/Utility/TableQuery.vue";
import TableData from "@/components/Utility/TableData.vue";
import Permissions from '@/mixins/Permissions';

export default {
    name: 'ProjectUsersTable',
    components: {
        AbsoluteLayout, FlexLayout,
        Spinner, TableQuery, TableData
    },
    mixins: [TableMixin, Permissions],

    data() {
        return {
            url: 'projects/user/total',
            fetch_module: 'FETCH_PROEJCT_USERS',
            tableData: [],
            project_info: {},
        };
    },
    mounted() {
        // this.fetchData();
        this.fetchUserData();
    },
    methods: {

        fetchUserData() {
            this.isLoading = true;
            axios.get(this.api_url + "projects/user/total",)
                .then((response) => {
                   console.log(response.data.data);
                   this.project_info = response.data.data;
                   this.tableData = response.data.data;
                    this.isLoading = false;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    }

};
</script>