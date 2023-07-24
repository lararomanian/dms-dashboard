<template>
  <div id="app">
    <router-view></router-view>
    <portal-target name="offcanvas"> </portal-target>
    <portal-target name="modal"> </portal-target>
    <portal-target name="share-modal"> </portal-target>
  </div>
</template>


<script>
  // import  "bootstrap/dist/js/bootstrap";
  // import "bootstrap/dist/js/bootstrap.min.js";
  import { Popover, Tooltip } from "bootstrap/dist/js/bootstrap.esm.min.js";

  export default {
    name: "App",
    mounted() {
      this.pathName = this.$route.path;
      Array.from(
        document.querySelectorAll('[data-bs-toggle="popover"]')
      ).forEach((popoverNode) => new Popover(popoverNode));
      Array.from(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      ).forEach((tooltipNode) => new Tooltip(tooltipNode));
    },
  };
</script>

<style lang="scss">
  @import "./assets/scss/main";
</style>
