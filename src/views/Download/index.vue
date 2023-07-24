<template>
    <flex-layout>
        <DownloadModal/>
        <page-header heading="Download" action="Add New" toggle="offcanvas" target="#offcanvasCreate" :guard="this.$route.meta.guard"
            @click="setCreateForm" />

        <DownloadTable  :tableHeading="tableHeading"/>
    </flex-layout>
</template>
  
<script>
import FlexLayout from "@/components/Layout/FlexLayout.vue";
import DownloadTable from "@/components/Download/table.vue";
import PageHeader from "@/components/Utility/PageHeader.vue";
import DownloadModal from "@/components/Download/modal.vue";
export default {
    name: "Download",
    components: {
        // AbsoluteLayout,
        PageHeader,
        FlexLayout,
        DownloadTable,
        DownloadModal
    },
    data() {
        return {
            tableHeading: [
                {
                    heading: "Title",
                },
                {
                    heading: "Category",
                },
                {
                    heading: "File",
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
  