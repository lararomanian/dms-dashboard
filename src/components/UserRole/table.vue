<template>
    <flex-layout styleClasses="p-24">
        <TableQuery :params="params" :sorts="sorts" :resetFilters="resetFilters" :sortBy="sortBy" />

        <div class="position-relative h-100">
            <absolute-layout :scrollable="true" styleClass="table-responsive">
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
                                {{ item.name }}
                            </td>
                            <td>
                                {{ item.role }}
                            </td>
                            <td class="action">
                                <button title="Edit" class="btn btn-sm btn-gray" data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasCreate" aria-controls="offcanvasCreate"
                                    @click.prevent="setEditData(item)" v-if="$can($route.meta.guard + '.update')">
                                    <i class="ic-edit"></i>
                                </button>
                            </td>
                        </tr>
                    </TableData>
                </table>
                <div class="table-footer">
                    <PerPage :options="options" :params="params" />
                    <paginate :page-class="'page-item'" :page-count="pageCount" :page-link-class="'page-link'"
                        :container-class="'pagination  pagination-sm'" :prev-text="`<i class='ic-chevron-left'></i>`"
                        :next-text="` <i class='ic-chevron-right'></i>`" :prev-class="'page-link pagination-arrow mr-2'"
                        :next-class="'page-link pagination-arrow ml-2'" :click-handler="handlePagination"
                        ref="paginate"></paginate>
                </div>

            </absolute-layout>
        </div>

    </flex-layout>
</template>
  

<script>
import AbsoluteLayout from "@/components/Layout/AbsoluteLayout.vue";
import FlexLayout from "@/components/Layout/FlexLayout.vue";
import TableMixin from "@/mixins/table.vue";
import Spinner from "@/components/Utility/Spinner.vue";
import PaginationMixin from "@/mixins/pagination.vue";
import PerPage from "@/components/Utility/PerPage.vue";
import TableQuery from "@/components/Utility/TableQuery.vue";
import TableData from "@/components/Utility/TableData.vue";
import Permissions from "@/mixins/Permissions.vue";

export default {
    name: 'UserRoleTable',
    components: {
        AbsoluteLayout, FlexLayout, PerPage,
        Spinner, TableQuery, TableData
    },
    mixins: [TableMixin, PaginationMixin, Permissions],

    data() {
        return {
            url: 'user-role',
            fetch_module: 'FETCH_USER_ROLES'
        };
    },
    methods: {
    },

};
</script>
<style scoped>

</style>
