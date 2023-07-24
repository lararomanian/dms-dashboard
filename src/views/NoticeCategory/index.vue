<template>
    <flex-layout>
        <NoticeCategoryModal />
        <page-header heading="NoticeCategory" action="Add New" toggle="offcanvas" target="#offcanvasCreate" :guard="this.$route.meta.guard"
            @click="setCreateForm" />
        <NoticeCategoryTable :tableHeading="tableHeading" />
    </flex-layout>
</template>

<script>
import FlexLayout from "@/components/Layout/FlexLayout.vue";
import NoticeCategoryTable from "@/components/NoticeCategory/table.vue";
import PageHeader from "@/components/Utility/PageHeader.vue";
import NoticeCategoryModal from "@/components/NoticeCategory/modal.vue";
export default {
    name: "NoticeCategory",
    components: {
        PageHeader,
        FlexLayout,
        NoticeCategoryTable,
        NoticeCategoryModal
    },
    data() {
        return {
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
