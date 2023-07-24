<template>
    <flex-layout>
        <page-header heading="Activity Log" toggle="offcanvas" target="#offcanvasCreate" />
        <ActivityTable :tableHeading="tableHeading" />
    </flex-layout>
</template>

<script>
import FlexLayout from "@/components/Layout/FlexLayout.vue";
import ActivityTable from "@/components/Activity/table.vue";
import PageHeader from "@/components/Utility/PageHeader.vue";

export default {
    name: "Activity",
    components: {
        FlexLayout, PageHeader, ActivityTable
    },
    data() {
        return {
            tableHeading: [
                {
                    heading: "User",
                },
                {
                    heading: "Description",
                },

                {
                    heading: "Logged At"
                }
            ],
        };
    },
    methods: {
    },
};
</script>