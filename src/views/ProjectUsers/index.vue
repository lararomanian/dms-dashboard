<template>
    <flex-layout>
        <ProjectUsersModal />
        <page-header heading="Project Users" action="Add New" toggle="offcanvas" target="#offcanvasCreate"
            :guard="this.$route.meta.guard" @click="setCreateForm" />

        <ProjectUsersTable :tableHeading="tableHeading" />
    </flex-layout>
</template>
  
<script>
import FlexLayout from "@/components/Layout/FlexLayout.vue";
import ProjectUsersTable from "@/components/ProjectUsers/table.vue";
import PageHeader from "@/components/Utility/PageHeader.vue";
import ProjectUsersModal from "@/components/ProjectUsers/modal.vue";
export default {
    name: "ProjectUsers",
    components: {
        // AbsoluteLayout,
        PageHeader,
        FlexLayout,
        ProjectUsersTable,
        ProjectUsersModal
    },
    data() {
        return {
            link_types: {},
            menu_types: {},
            parents: {},
            api_url: process.env.VUE_APP_API_URL,
            storage: process.env.VUE_APP_API_STORAGE,
            tableHeading: [
                {
                    heading: "Title",
                },
                {
                    heading: "Users"
                }
            ],
        };
    },
    methods: {
        setCreateForm() {
            this.$root.$emit('CREATE');
        },
    },
    mounted() {
    }
};
</script>
  