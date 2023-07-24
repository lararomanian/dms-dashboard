<template>
    <flex-layout>
        <FooterLinkModal/>
        <page-header heading="Footer Links" action="Add" toggle="offcanvas" target="#offcanvasCreate" :guard="this.$route.meta.guard"
            @click="setCreateForm" />

        <FooterLinkTable :tableHeading="tableHeading" />
    </flex-layout>
</template>
  
<script>
import FlexLayout from "@/components/Layout/FlexLayout.vue";
import FooterLinkTable from "@/components/FooterLink/table.vue";
import PageHeader from "@/components/Utility/PageHeader.vue";
import FooterLinkModal from "@/components/FooterLink/modal.vue";
export default {
    name: "FooterLink",
    components: {
        PageHeader,
        FlexLayout,
        FooterLinkTable,
        FooterLinkModal
    },
    data() {
        return {
            tableHeading: [
                {
                    heading: "Title",
                },
                {
                    heading: "Type",
                },
                {
                    heading: "Link",
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
  