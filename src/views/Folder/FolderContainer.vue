<template>
  <div class="folder-container">
    
    <div class="back-button" v-if="showBackButton" @click="goBack">
      <img src="@/assets/img/back.png" alt="Back Icon" class="img-back" />
      <span>Back</span>
    </div>

    <div v-for="item in folderItems" :key="item.id">
      <template v-if="item.type === 'folder'">
        <FolderItem :folder="item" @folder-clicked="handleFolderClick"
          @folder-with-documents-clicked="handleFolderWithDocumentsClick" />
      </template>
      <template v-else-if="item.type === 'document'">
        <DocumentItem :document="item" />
      </template>
    </div>
    <DocumentContainer v-if="showDocumentContainer" :documents="selectedFolder.documents" />
  </div>
</template>
  
<script>
import FolderItem from './FolderItem.vue';
import DocumentContainer from './DocumentContainer.vue';
import DocumentItem from './DocumentItem.vue';

export default {
  props: ['folders'],
  data() {
    return {
      selectedFolder: null,
      main_folder_id: null,
      main_project_id: null,
    };
  },
  computed: {
    showBackButton() {
      return this.folders.length > 0;
    },
    folderItems() {
      // Flatten the folder and document data into a single array
      const items = [];
      this.folders.forEach(folder => {
        items.push({ ...folder, type: 'folder' });
        if (folder.documents && folder.documents.length > 0) {
          folder.documents.forEach(document => {
            items.push({ ...document, type: 'document' });
          });
        }
      });
      return items;
    },
    showDocumentContainer() {
      return this.selectedFolder && this.selectedFolder.documents && this.selectedFolder.documents.length > 0;
    },
  },
  methods: {
    handleFolderClick(folder) {
      this.selectedFolder = folder;
      this.$emit('folder-clicked', folder);
    },
    handleFolderWithDocumentsClick(folder) {
      this.selectedFolder = folder;
    },
    goBack() {
      this.selectedFolder = null;
      this.$emit('back');
    },
  },
  mounted() {
  },
  components: {
    FolderItem,
    DocumentContainer,
    DocumentItem,
  },
};
</script>
  
  
  
<style>
.folder-container {
  padding-left: 24px;
}

.folder-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 80px;
  transition: background-color 0.2s ease;
}

.folder-icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

.folder-icon img {
  width: 400%;
  height: 400%;
}

.folder-item:hover {
  background-color: #f0f0f0;
}

.img-back {
  width: 20px;
  height: 20px;
}
</style>
  