<template>
  <flex-layout>
    <MenuModal :parents="parents" />
    <page-header heading="Menus" action="Add" toggle="offcanvas" target="#offcanvasCreate" @click="setCreateForm" :guard="this.$route.meta.guard"/>
    <menu-table :tableHeading="tableHeading" />
  </flex-layout>
</template>

<script>
import FlexLayout from "@/components/Layout/FlexLayout.vue";
import MenuModal from "@/components/Menus/modal.vue";
import MenuTable from "@/components/Menus/table.vue";
import PageHeader from "@/components/Utility/PageHeader.vue";
export default {
  name: "Menus",
  components: {
    PageHeader,
    FlexLayout,
    MenuModal,
    MenuTable
  },
  data() {
    return {
      parents: {},
      tableHeading: [
        {
          heading: "Parent",
        },
        {
          heading: "Name",
        },
        {
          heading: "Link",
        },
        {
          heading: "Type",
        },
        {
          heading: "Status",
        },
      ],
    };
  },
  async created() {
    let url = process.env.VUE_APP_API_URL + 'menu/parents';
    let response = await this.axios.get(url);
    this.parents = response.data.data;
  },
  methods: {

    setCreateForm() {
      this.$root.$emit('CREATE');
    },
  }
};
</script>
