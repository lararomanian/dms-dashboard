<template>
    <div class="file-editor">
      <div class="folder-navigation">
        <router-link
          v-if="currentFolder.parent_id"
          :to="{ path: `/` }"
          class="back-button"
        >
          <i class="material-icons">arrow_back</i> Back
        </router-link>
        <div class="folder-container">
          <FolderItem
            v-for="folder in currentFolder.subfolders"
            :key="folder.id"
            :folder="folder"
            @folder-clicked="handleFolderClick"
          />
        </div>
      </div>
      <div class="document-display">
        <DocumentItem
          v-for="document in currentFolder.documents"
          :key="document.id"
          :document="document"
        />
      </div>
    </div>
  </template>
  
  <script>
  import FolderItem from './FolderItem.vue';
  import DocumentItem from './DocumentItem.vue';
  
  export default {
    data() {
      return {
        currentFolder: {
          id: null,
          subfolders: [],
          documents: [],
          parent_id: null,
          name: 'Root',
        }, // Initialize with a root folder
      };
    },
    components: {
      FolderItem,
      DocumentItem,
    },
    methods: {
      handleFolderClick(folder) {
        this.currentFolder = folder;
      },
    },
  };
  </script>
  
  <style>
  .file-editor {
    display: flex;
    height: 100%;
  }
  
  .folder-navigation {
    flex: 1;
    background-color: #f0f0f0;
    padding: 16px;
    position: relative;
  }
  
  .back-button {
    position: absolute;
    top: 16px;
    left: 16px;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #333;
  }
  
  .material-icons {
    font-size: 20px;
    margin-right: 8px;
  }
  
  .folder-container {
    display: flex;
    flex-wrap: wrap;
  }
  
  .document-display {
    flex: 2;
    padding: 16px;
  }
  </style>
  