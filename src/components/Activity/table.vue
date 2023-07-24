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

                    </thead>
                    <Spinner v-if="isLoading" />
                    <TableData :tableData="tableData" v-else>
                        <tr v-for="item in tableData" :key="item.index">
                            <td>
                                {{ item.user }}
                            </td>
                            <td>
                                <!-- {{
                                    item.subject_type.substr(11).replace(/([A-Z])/g, ' $1').trim() + " was " +
                                        item.description
                                }} -->
                                 {{
                                    item.subject_type.split("Models\\")[1].trim().replace(/([A-Z])/g, ' $1').trim() + " was " +
                                        item.description
                                }}
                            </td>
                            <td>
                                {{ item.created_at }}
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

export default {
    name: 'ActivityTable',
    components: {
        AbsoluteLayout, FlexLayout, PerPage,
        Spinner, TableQuery, TableData
    },
    mixins: [TableMixin, PaginationMixin],

    data() {
        return {
            url: 'activity',
            item: {},
        };
    },
    mounted() {

    },
};
</script>
<style scoped>

</style>
