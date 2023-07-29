<template>
  <div class="folder-item" @click="handleClick">
    <div class="folder-icon">
      <img :src="folderIconPath" alt="Folder Icon" />
    </div>
    <span>{{ folder.name }}</span>
    <div class="add-new-doc-button">
      <button v-if="(action != 'null') && $can(guard+'.create')" class="btn btn-sm btn-outline-primary" 
        :data-bs-toggle="toggle!='null'?toggle:''" 
        :data-bs-target="target!='null'?target:''"
        @click="$emit('click')"
      >
      <i :class="icon"></i>
      {{ action }}
    </button>
      <DocumentModal/>
    </div>
  </div>
</template>

<script>  
import DocumentModal from "@/components/Documents/modal.vue";

export default {
  props: ['folder'],
  components: {
    DocumentModal,
  },
  methods: {
    handleClick() {
      if (this.folder.documents && this.folder.documents.length > 0) {
        this.$emit('folder-with-documents-clicked', this.folder);
      } else {
        this.$emit('folder-clicked', this.folder);
      }
    },
    openDocumentModal() {
      console.log("openDocumentModal")
      this.$root.$emit('CREATE'); // Emit the custom event to open the modal
    },
  },
  computed: {
    folderIconPath() {
      return require('@/assets/img/folder.png'); // Updated relative path
    },
  },
};
</script>

<style>
/* Your existing CSS styles for folder item */
</style>
