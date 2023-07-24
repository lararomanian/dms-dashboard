<template>
  <div class="container" :class="stretch && 'app-height'">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ContainerLayout",
  props: {
    stretch: Boolean,
  },
};
</script>
