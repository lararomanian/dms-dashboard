<template>
  <flex-layout styleClasses="p-24">

    <div class="position-relative h-100">
      <absolute-layout :scrollable="true">
        <div class="row h-100">
          <div class="col-lg-9">
            <TableQuery :params="params" :sorts="sorts" :resetFilters="resetFilters" :sortBy="sortBy" />
            <div class="table-responsive">

              <table class="table table-01" width="50%">
                <thead>
                  <th v-for="item in tableHeading" :key="item.index">
                    {{ item.heading }}
                  </th>

                  <th>Actions</th>
                </thead>
                <Spinner v-if="isLoading" />
                <TableData :tableData="tableData" v-else>
                  <tr v-for="item in tableData" :key="item.index">
                    <td>
                      {{ item.parent }}
                    </td>
                    <td>{{ item.title }}</td>
                    <td>
                      <a :href="item.link" target="_blank">{{ item.link }}</a>
                    </td>
                    <td>{{ item.menu_type }}</td>
                    <td>
                      <div class="badge rounded-pill" :class="{ 'bg-red': !item.status, 'bg-green': item.status }">
                        {{ item.status ? "Active" : "In-Active" }}
                      </div>
                    </td>
                    <td class="action">
                      <!-- <button
                        title="View Children"
                        class="btn btn-sm btn-gray"
      
                      >
                      <i class="ic-view"></i>
                      </button> -->
                      <button title="Edit" class="btn btn-sm btn-gray" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasCreate" aria-controls="offcanvasCreate"
                        @click.prevent="setEditData(item)"
                        v-if="$can($route.meta.guard + '.update')">
                        <i class="ic-edit"></i>
                      </button>
                      <button title="Delete" class="btn btn-sm btn-gray" @click="deleteData(item.id)"
                      v-if="$can($route.meta.guard + '.delete')">
                        <i class="ic-delete"></i>
                      </button>
                    </td>
                  </tr>
                </TableData>

              </table>
            </div>
            <div class="table-footer">
              <PerPage :options="options" :params="params" />
              <paginate :page-class="'page-item'" :page-count="pageCount" :page-link-class="'page-link'"
                :container-class="'pagination  pagination-sm'" :prev-text="`<i class='ic-chevron-left'></i>`"
                :next-text="` <i class='ic-chevron-right'></i>`" :prev-class="'page-link pagination-arrow mr-2'"
                :next-class="'page-link pagination-arrow ml-2'" :click-handler="handlePagination" ref="paginate">
              </paginate>
            </div>

          </div>
          <div class="col-lg-3">
            <div class="position-relative h-100">
              <absolute-layout :scrollable="true">
                <draggable class="dragArea list-group" tag="ul" :list="parentList" :group="{ title: 'g1' }"
                  @end="checkMove" v-if="!isLoading">
                  <li v-for="el in parentList" :key="el.title" class="list-group-item">
                    <p>{{ el.title }}
                    </p>
                    <draggable class="dragArea list-group" tag="ul" :list="el.childs" :group="{ title: 'g1' }"
                      @end="checkMove">
                  <li v-for="child1 in el.childs" :key="child1.title" style="padding-left: 20px" class="list-group-item">
                    <p>{{ child1.title }}</p>
                    <draggable class="dragArea list-group" tag="ul" :list="child1.childs" :group="{ title: 'g1' }"
                      @end="checkMove">
                  <li v-for="child2 in child1.childs" :key="child2.title" style="padding-left: 40px"
                    class="list-group-item">
                    <p>{{ child2.title }}</p>
                  </li>
                </draggable>
                </li>
                </draggable>
                </li>
                </draggable>
              </absolute-layout>
            </div>
          </div>
        </div>
      </absolute-layout>

    </div>

  </flex-layout>
</template>

<script>
import AbsoluteLayout from "../Layout/AbsoluteLayout.vue";
import FlexLayout from "../Layout/FlexLayout.vue";
import Spinner from "../Utility/Spinner.vue";
import draggable from "vuedraggable";
import TableMixin from "../../mixins/table.vue";
import PaginationMixin from "@/mixins/pagination.vue";
import PerPage from "@/components/Utility/PerPage.vue";
import TableQuery from "@/components/Utility/TableQuery.vue";
import TableData from "@/components/Utility/TableData.vue";
import Permissions from '@/mixins/Permissions';

export default {
  name: "MenuTable",
  components: {
    AbsoluteLayout, FlexLayout, PerPage,
    draggable,
    Spinner, TableQuery, TableData
  },
  mixins: [TableMixin, PaginationMixin, Permissions],

  data() {
    return {

      parentList: [],
      url: 'menu',
      fetch_module: 'FETCH_MENUs'
    };
  },
  methods: {
    fetchData(url = null) {
      this.isLoading = true;
      let uri = url ? url : process.env.VUE_APP_API_URL + "menu";
      this.axios.get(uri, { params: this.params }).then((response) => {
        this.tableData = response.data.data;
        this.paginationDetail = response.data.meta;
        this.pageCount = Math.ceil(this.paginationDetail.total / this.paginationDetail.per_page);
        this.$root.$emit("paginate", response.data);
        this.isLoading = false;
      });

      this.axios.get(process.env.VUE_APP_API_URL + 'menu/list').then((response) => {
        this.parentList = response.data.data;
      });
    },


    checkMove: function (e) {
      console.log("Future index: " + e);
      // console.log(this.parentData);
      let uri = process.env.VUE_APP_API_URL + "menu/reorder";
      this.axios.post(uri, this.parentList)
        .then((response) => {
          console.log(response);
        });
    },
  },
};
</script>
<style scoped>
.app-absolute-layout {
  /* width: 75% !important; */
}

.dragArea {
  min-height: 25px;
  /* outline: 1px dashed; */
}
</style>
