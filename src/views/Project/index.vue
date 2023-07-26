<template>
    <flex-layout>
        <ProjectModal/>
        <page-header heading="Project" action="Add New" toggle="offcanvas" target="#offcanvasCreate"
            :guard="this.$route.meta.guard" @click="setCreateForm" />

        <ProjectTable  :tableHeading="tableHeading"/>
    </flex-layout>
</template>
  
<script>
import FlexLayout from "@/components/Layout/FlexLayout.vue";
import ProjectTable from "@/components/Project/table.vue";
import PageHeader from "@/components/Utility/PageHeader.vue";
import ProjectModal from "@/components/Project/modal.vue";
export default {
    name: "Project",
    components: {
        // AbsoluteLayout,
        PageHeader,
        FlexLayout,
        ProjectTable,
        ProjectModal
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
  