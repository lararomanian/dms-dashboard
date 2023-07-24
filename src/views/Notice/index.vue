<template>
    <flex-layout>
        <NoticeModal />
        <page-header heading="Notice" action="Add New" toggle="offcanvas" target="#offcanvasCreate" :guard="this.$route.meta.guard"
            @click="setCreateForm" />

        <NoticeTable :tableHeading="tableHeading" />
    </flex-layout>
</template>

<script>
import FlexLayout from "@/components/Layout/FlexLayout.vue";
import NoticeTable from "@/components/Notice/table.vue";
import PageHeader from "@/components/Utility/PageHeader.vue";
import NoticeModal from "@/components/Notice/modal.vue";
export default {
    name: "Notice",
    components: {
        // AbsoluteLayout,
        PageHeader,
        FlexLayout,
        NoticeTable,
        NoticeModal
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
                    heading: "Image",
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
