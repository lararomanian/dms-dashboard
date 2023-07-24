<template>
    <flex-layout>
        <RoleSetupModal :permission_lists="permission_lists" :permission_titles="permission_titles" />
        <page-header heading="Role SetUp" action="Add" toggle="offcanvas" target="#offcanvasCreate"
            :guard="this.$route.meta.guard" @click="setCreateForm" />

        <RoleSetupTable :tableHeading="tableHeading" />
    </flex-layout>
</template>

<script>
import FlexLayout from "@/components/Layout/FlexLayout.vue";
import RoleSetupTable from "@/components/RoleSetup/table.vue";
import PageHeader from "@/components/Utility/PageHeader.vue";
import RoleSetupModal from "@/components/RoleSetup/modal.vue";
export default {
    name: "RoleSetup",
    components: {
        PageHeader,
        FlexLayout,
        RoleSetupTable,
        RoleSetupModal
    },
    data() {
        return {
            permission_lists: [],
            permission_titles: [],
            tableHeading: [
                {
                    heading: "Title",
                }
            ],
        };
    },
    mounted() {

        this.fetchPermissionList();
    },

    methods: {
        async fetchPermissionList() {
            let uri = process.env.VUE_APP_API_URL + 'roles'
            this.isLoading = true
            try {
                this.axios.get(uri, { params: this.params }).then(({ data }) => {
                    this.permission_lists = data;
                    this.permission_lists.forEach(el => {
                        this.permission_titles.push(el.substring(0, el.indexOf('.')));
                        this.permission_titles = [...new Set(this.permission_titles)]
                    });
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
