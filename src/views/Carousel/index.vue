<template>
    <flex-layout>
        <CarouselModal/>
        <page-header heading="Carousel" action="Add New" toggle="offcanvas" target="#offcanvasCreate" :guard="this.$route.meta.guard"
            @click="setCreateForm"  />
        <CarouselTable  :tableHeading="tableHeading"/>
    </flex-layout>
</template>
  
<script>
import FlexLayout from "@/components/Layout/FlexLayout.vue";
import CarouselTable from "@/components/Carousel/table.vue";
import PageHeader from "@/components/Utility/PageHeader.vue";
import CarouselModal from "@/components/Carousel/modal.vue";
export default {
    name: "Carousel",
    components: {
        // AbsoluteLayout,
        PageHeader,
        FlexLayout,
        CarouselTable,
        CarouselModal
    },
    data() {
        return {
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
  