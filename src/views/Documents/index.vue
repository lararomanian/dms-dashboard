<template>
    <flex-layout>
        <DocumentModal/>
        <page-header heading="Documents" action="Add New" toggle="offcanvas" target="#offcanvasCreate"
            :guard="this.$route.meta.guard" @click="setCreateForm" />

        <DocumentTable  :tableHeading="tableHeading"/>
    </flex-layout>
</template>
  
<script>
import FlexLayout from "@/components/Layout/FlexLayout.vue";
import DocumentTable from "@/components/Documents/table.vue";
import PageHeader from "@/components/Utility/PageHeader.vue";
import DocumentModal from "@/components/Documents/modal.vue";
export default {
    name: "Documents",
    components: {
        // AbsoluteLayout,
        PageHeader,
        FlexLayout,
        DocumentTable,
        DocumentModal
    },
    data() {
        return {
            link_types: {},
            menu_types: {},
            parents: {},

            tableHeading: [
                {
                    heading: "Title",
                },
                {
                    heading: "Slug",
                },
                {
                    heading: "Description",
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
  