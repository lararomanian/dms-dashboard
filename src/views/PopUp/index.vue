<template>
    <flex-layout>
        <PopUpModal/>
        <page-header heading="PopUp" action="Add New" toggle="offcanvas" target="#offcanvasCreate" :guard="this.$route.meta.guard"
            @click="setCreateForm" />

        <PopUpTable  :tableHeading="tableHeading"/>
    </flex-layout>
</template>
  
<script>
import FlexLayout from "@/components/Layout/FlexLayout.vue";
import PopUpTable from "@/components/PopUp/table.vue";
import PageHeader from "@/components/Utility/PageHeader.vue";
import PopUpModal from "@/components/PopUp/modal.vue";
export default {
    name: "Menus",
    components: {
        // AbsoluteLayout,
        PageHeader,
        FlexLayout,
        PopUpTable,
        PopUpModal
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
  