<template>
    <flex-layout>
        <UserRoleSetupModal :users="users" :roles="roles" />
        <page-header heading=" User Role SetUp" :guard="this.$route.meta.guard" />

        <UserRoleTable :tableHeading="tableHeading" />
    </flex-layout>
</template>

<script>
import FlexLayout from "@/components/Layout/FlexLayout.vue";
import UserRoleTable from "@/components/UserRole/table.vue";
import PageHeader from "@/components/Utility/PageHeader.vue";
import UserRoleSetupModal from "@/components/UserRole/modal.vue";
export default {
    name: "UserRoleSetups",
    components: {
        PageHeader,
        FlexLayout,
        UserRoleTable,
        UserRoleSetupModal
    },
    data() {
        return {
            users: [],
            roles: [],
            tableHeading: [
                {
                    heading: "Title",
                },
                {
                    heading: "Role",
                }
            ],
        };
    },
    mounted() {

        this.fetchRolesList();
    },

    methods: {

        async fetchRolesList() {
            let uri = process.env.VUE_APP_API_URL + 'user-role/roles'
            this.isLoading = true
            try {
                this.axios.get(uri, { params: this.params }).then(({ data }) => {
                    this.roles = data;
                });
            } catch (error) {
                console.log(error)
            } finally {
                this.isLoading = false
            }
        },
        setCreateForm() {
            this.$root.$emit('CREATE');
        },
    }
};
</script>
