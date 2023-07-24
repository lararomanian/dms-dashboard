<template>
    <flex-layout>
        <MemberTeamModal />
        <page-header heading="Member Management" action="Add" toggle="offcanvas" target="#offcanvasCreate" :guard="this.$route.meta.guard"
            @click="setCreateForm('hello')" />

        <MemberTable :tableHeading="tableHeading" />
    </flex-layout>
</template>
  
<script>
import FlexLayout from "@/components/Layout/FlexLayout.vue";
import MemberTable from "@/components/Member/table.vue";
import PageHeader from "@/components/Utility/PageHeader.vue";
import MemberTeamModal from "@/components/Member/modal.vue";
export default {
    name: "Member",
    components: {
        PageHeader,
        FlexLayout,
        MemberTable,
        MemberTeamModal
    },
    data() {
        return {
            tableHeading: [
                {
                    heading: "Name",
                },
                {
                    heading: "Type",
                },
                {
                    heading: "Email",
                },
                {
                    heading: "Contact Number",
                },
                {
                    heading: "Image",
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
  