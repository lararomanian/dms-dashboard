<template>
    <flex-layout>
        <NewsModal/>
        <page-header heading="News" action="Add New" toggle="offcanvas" target="#offcanvasCreate" :guard="this.$route.meta.guard"
            @click="setCreateForm" />

        <NewsTable  :tableHeading="tableHeading"/>
    </flex-layout>
</template>
  
<script>
import FlexLayout from "@/components/Layout/FlexLayout.vue";
import NewsTable from "@/components/News/table.vue";
import PageHeader from "@/components/Utility/PageHeader.vue";
import NewsModal from "@/components/News/modal.vue";
export default {
    name: "News",
    components: {
        PageHeader,
        FlexLayout,
        NewsTable,
        NewsModal
    },
    data() {
        return {
            tableHeading: [
                {
                    heading: "Title",
                },
                {
                    heading: "Content",
                },
                {
                    heading:"File"
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
  