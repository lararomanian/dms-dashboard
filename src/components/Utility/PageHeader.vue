<template>
  <div class="page-header">
    <h5>{{ heading }}</h5>

    <div style="display: flex;gap:5px;">
      <slot name="example"></slot>
      <slot name="add"></slot>
    <button v-if="(action != 'null') && $can(guard+'.create')" class="btn btn-sm btn-outline-primary" 
        :data-bs-toggle="toggle!='null'?toggle:''" 
        :data-bs-target="target!='null'?target:''"
        @click="$emit('click')"
      >
      <i :class="icon"></i>
      {{ action }}
    </button>

    <slot name="export"></slot>
  </div>

  </div>
</template>

<script>

import Permissions from "@/mixins/Permissions.vue";

  export default {
    name: "PageHeader",
    mixins: [Permissions],
    data() {
      return {};
    },
    props: {
      heading: String,
      action: {
        type: String,
        default: "null",
      },
      toggle: {
        type: String,
        default: "null"
      },
      target: {
        type: String,
        default:'null'
      },
      icon: {
        type: String,
        default:'ic-plus'
      },
      guard: {
        type: String,
        default:"null"
      }

    },
  };
</script>
