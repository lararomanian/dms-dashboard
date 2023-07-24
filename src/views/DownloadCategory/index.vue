<template>
    <flex-layout>
        <DownloadCategoryModal/>
        <page-header heading="DownloadCategory" action="Add New" toggle="offcanvas" target="#offcanvasCreate" :guard="this.$route.meta.guard"
            @click="setCreateForm" />

        <DownloadCategoryTable  :tableHeading="tableHeading"/>
    </flex-layout>
</template>
  
<script>
import FlexLayout from "@/components/Layout/FlexLayout.vue";
import DownloadCategoryTable from "@/components/DownloadCategory/table.vue";
import PageHeader from "@/components/Utility/PageHeader.vue";
import DownloadCategoryModal from "@/components/DownloadCategory/modal.vue";
export default {
    name: "DownloadCategory",
    components: {
        // AbsoluteLayout,
        PageHeader,
        FlexLayout,
        DownloadCategoryTable,
        DownloadCategoryModal
    },
    data() {
        return {
            tableHeading: [
                {
                    heading: "Title",
                },
              
                {
                    heading: "Status",
                },
            ],
        };
    },
    methods: {
        setCreateForm() {
            this.$root.$emit('CREATE');
        },
    }
};
</script>
  