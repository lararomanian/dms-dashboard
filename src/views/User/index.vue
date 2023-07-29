<template>
    <flex-layout>
        <UserModal />
        <UserDetailModal/>
        <page-header heading="User Management" action="Add" toggle="offcanvas" target="#offcanvasCreate" :guard="this.$route.meta.guard"
            @click="setCreateForm()" />

        <UserTable :tableHeading="tableHeading" />
    </flex-layout>
</template>
  
<script>
import FlexLayout from "@/components/Layout/FlexLayout.vue";
import UserTable from "@/components/User/table.vue";
import PageHeader from "@/components/Utility/PageHeader.vue";
import UserModal from "@/components/User/modal.vue";
import UserDetailModal from "@/components/User/updatemodal.vue";
export default {
    name: "UserManagement",
    components: {
        // AbsoluteLayout,
        PageHeader,
        FlexLayout,
        UserTable,
        UserModal,
        UserDetailModal
    },
    data() {
        return {
            tableHeading: [
                {   
                    heading: "Name",
                },
                {
                    heading: "Email",
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
  