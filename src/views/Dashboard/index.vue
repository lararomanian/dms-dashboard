<template>
  <wrapper-layout>
    <Header @clicked="toggleSidebar" />
    <base-layout>
      <MainSidebar :isToggled="isToggled" />
      <!-- <flex-layout> -->
      <router-view> </router-view>
      <!-- </flex-layout> -->
    </base-layout>
  </wrapper-layout>
</template>

<script>
  import WrapperLayout from "../../components/Layout/WrapperLayout.vue";
  import BaseLayout from "../../components/Layout/BaseLayout.vue";
  import Header from "../../components/Header/Header.vue";
  import MainSidebar from "../../components/Sidebar/MainSidebar.vue";
  // import FlexLayout from "../../components/Layout/FlexLayout.vue";

  export default {
    name: "MainIndex",
    components: {
      WrapperLayout,
      BaseLayout,
      Header,
      MainSidebar,
      // FlexLayout,
    },
    data() {
      return {
        isToggled: false,
      };
    },
    methods: {
      toggleSidebar(state) {
        this.isToggled = state;
      },
    },
  };
</script>
