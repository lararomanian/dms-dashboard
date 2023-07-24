<template>
  <div class="app-flex-layout" :class="styleClasses">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "FlexLayout",
    props: {
      styleClasses: String,
    },
  };
</script>
