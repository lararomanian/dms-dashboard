<template>
  <div class="folder-container">
    <div class="flex-container">
      <!-- Folders -->
      <div class="folders-column">
        <div class="page-header">
          <h5>Create New Folder</h5>
          <div class="header-buttons">
            <router-link :to="{ path: `/` }" v-if="showBackButton" class="back-link">
              <button class="btn btn-sm btn-outline-danger" @click="goBack">
                <i class="ic-chevron-left"></i>Go Back
              </button>
            </router-link>
            <button class="btn btn-sm btn-outline-danger" v-if="$can('folder.delete')" @click="deleteFolder">
              <i class="ic-checklist"></i>Delete Folder
            </button>
            <button data-bs-toggle="offcanvas" v-if="$can('folder.create')" data-bs-target="#offcanvasCreateFolder"
              class="btn btn-sm btn-secondary" action="Create Button" @click="setCreateForm">
              <i class="ic-plus"></i> Add Folder
            </button>
            <button data-bs-toggle="offcanvas" v-if="$can('documents.create')" data-bs-target="#offcanvasCreate"
              class="btn btn-sm btn-outline-primary" action="Create Button" @click="setCreateForm">
              <i class="ic-plus"></i> Add Files
            </button>
          </div>
        </div>

        <div v-for="item in folderItems" :key="item.id">
          <template v-if="item.type === 'folder'">
            <FolderItem :folder="item" @folder-clicked="handleFolderClick"
              @folder-with-documents-clicked="handleFolderWithDocumentsClick" />
          </template>
        </div>
      </div>

      <div class="documents-column">
        <DocumentContainer v-if="showDocumentContainer" :documents="selectedFolder.documents" />
      </div>


    </div>

    <FolderModal :parent_id="selectedFolder ? selectedFolder.id : null" :project_id="this.project_id" />
  </div>
</template>

<script>
import axios from 'axios';
import FolderItem from './FolderItem.vue';
import DocumentContainer from './DocumentContainer.vue';
import FolderModal from "@/components/Folders/modal.vue";

export default {
  props: ['folders', 'project_id'],
  data() {
    return {
      selectedFolder: null,
    };
  },
  computed: {
    showBackButton() {
      return this.folders.length > 0;
    },
    folderItems() {
      // Flatten the folder and document data into a single array
      const items = [];
      this.folders.forEach((folder) => {
        items.push({ ...folder, type: 'folder' });
        if (folder.documents && folder.documents.length > 0) {
          folder.documents.forEach((document) => {
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
    setCreateForm() {
      this.$root.$emit('CREATE');
    },
    deleteFolder() {

      axios.delete(`http://127.0.0.1:8000/api/folders/delete/${this.folders[0].id}`).then((response) => {
        console.log(response);
        this.$root.$emit('REFRESH');
        this.$toast.success(response.data.message, {
          position: "bottom-right",
        });

        this.$router.push({
          path: `/`,
        });
      }).catch((error) => {
        console.log(error);
        this.$toast.error(error.response.data.message, {
          position: "bottom-right",
        });
      });

    }
  },
  components: {
    FolderItem,
    DocumentContainer,
    FolderModal
  },
};
</script>


<style>
/* Container styles */
.folder-container {
  padding: 24px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.flex-container {
  display: flex;
  gap: 20px;
}

.folders-column {
  flex: 1;
}

.documents-column {
  flex: 1;
}

/* Page header styles */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #ddd;
}

.page-header h5 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.header-buttons {
  display: flex;
  gap: 8px;
}

.back-link {
  text-decoration: none;
}

/* Folder and document item styles */
.folder-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 12px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.folder-icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

.folder-icon img {
  width: 100%;
  height: 100%;
}

.folder-item:hover {
  background-color: #f0f0f0;
}

/* Additional styles for the DocumentContainer */
.document-container {
  margin-top: auto;
  padding: 16px;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Add any additional styling for DocumentContainer items here */
.document-item {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 8px;
}

.document-item:last-child {
  margin-bottom: 0;
}
</style>