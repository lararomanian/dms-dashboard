<template>
  <section class="folder-container">
    <header class="page-header">
      <h5>Create New Folder</h5>
      <div class="header-buttons">
        <div class="back-link" @click="goBack">
          <button class="btn btn-sm btn-outline-danger">
            <i class="ic-chevron-left"></i>Go Back
          </button>
        </div>
        <button v-if="$can('folder.delete')" class="btn btn-sm btn-outline-danger" @click="deleteFolder">
          <i class="ic-checklist"></i>Delete Folder
        </button>
        <button data-bs-toggle="offcanvas" v-if="$can('folder.create')" data-bs-target="#offcanvasCreateFolder"
          class="btn btn-sm btn-secondary" action="Create Button" @click="setCreateForm">
          <i class="ic-plus"></i> Add Folder
        </button>
        <button data-bs-toggle="offcanvas" v-if="$can('documents.create')" data-bs-target="#offcanvasCreateDocument"
          class="btn btn-sm btn-outline-primary" action="Create Button" @click="setCreateForm">
          <i class="ic-plus"></i> Add Files
        </button>
      </div>
    </header>

    <div class="flex-container">
      <div class="folders-column">
        <div v-if="selectedFolder">
          <h6 class="folder-title">Subfolders</h6>
          <div v-for="folder in filteredSubfolders" :key="folder.id">
            <FolderItem :folder="folder" @folder-clicked="handleFolderClick" />
          </div>
        </div>
        <div v-else>
          <h6 class="folder-title">Top-level Folders</h6>
          <div v-for="folder in folders" :key="folder.id">
            <FolderItem :folder="folder" @folder-clicked="handleFolderClick" />
          </div>
        </div>
      </div>

      <div class="documents-column">
        <!-- Render DocumentContainer with the documents prop -->
        <DocumentContainer :documents="documents" />
      </div>
    </div>

    <FolderModal :parent_id="selectedFolder ? selectedFolder.id : null" :project_id="project_id" />
    <DocumentModal :main_folder_id="selectedFolder ? selectedFolder.id : null" :main_project_id="project_id" />

  </section>
</template>

<script>
import axios from 'axios';
import FolderItem from './FolderItem.vue';
import DocumentContainer from './DocumentContainer.vue';
import FolderModal from "@/components/Folders/modal.vue";
import DocumentModal from "@/components/Documents/modal.vue";

export default {
  props: ['folders', 'project_id'],
  data() {
    return {
      folderPath: [], // Array to keep track of the current folder's path
      documents: [],
    };
  },
  computed: {
    selectedFolder() {
      // Get the currently selected folder based on the folderPath
      return this.folderPath.length > 0
        ? this.folderPath[this.folderPath.length - 1]
        : null;
    },
    showBackButton() {
      return this.folderPath.length > 1; // Show the "Go Back" button if there's a parent folder
    },
    filteredSubfolders() {
      if (!this.selectedFolder) {
        return this.folders;
      }
      return this.selectedFolder.subfolders || [];
    },
  },
  methods: {
    handleFolderClick(folder) {
      this.folderPath.push(folder); // Add the clicked folder to the folderPath
      this.documents = folder.documents || [];
      this.$emit('folder-clicked', folder);
    },
    goBack() {
      // if (this.folderPath.length > 1) {
      //   // If there are parent folders, go back to the previous folder
      //   this.folderPath.pop();
      //   const parentFolder = this.folderPath[this.folderPath.length - 1];
      //   this.documents = parentFolder.documents || [];
      // } else {
      //   // If no parent folders, show top-level folders
      //   this.folderPath = [];
      //   this.documents = [];
      // }

      // Check if the current route is different from the initial landing page
      if (this.folderPath.length > 1) {
        // If there are parent folders, go back to the previous folder
        this.folderPath.pop();
        const parentFolder = this.folderPath[this.folderPath.length - 1];
        this.documents = parentFolder.documents || [];
      } else {
        // If no parent folders, show top-level folders
        this.folderPath = [];
        this.documents = [];
      }
      // Navigate back using this.$router.go(-1)
      this.$router.go(-1);
    },
    setCreateForm() {
      this.$root.$emit('CREATE');
    },
    deleteFolder() {
      if (!this.folders.length) return;
      const { id: folderId } = this.folders[0];
      axios.delete(`http://127.0.0.1:8000/api/folders/delete/${folderId}`)
        .then((response) => {
          console.log(response);
          // Emit the event to notify the parent component to refresh folders
          this.$emit('folder-refreshed');
          this.$toast.danger(response.data.message, { position: "bottom-right" });
          this.$router.push({ path: `/` });
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error(error.response.data.message, { position: "bottom-right" });
        });
    },
  },
  components: {
    FolderItem,
    DocumentContainer,
    FolderModal,
    DocumentModal
  },
  mounted() {
    if (this.folders.length === 1) {
      // If there is only one folder, set its documents
      this.documents = this.folders[0].documents || [];
    }
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
  cursor: pointer;
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
  margin-top: 24px;
  padding: 16px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.folder-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
  margin-bottom: 16px;
}

.documents-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
}

.document-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 150px;
}

.document-icon {
  font-size: 32px;
  margin-bottom: 8px;
  color: #555;
}

.document-name {
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 4px;
}

.document-size {
  font-size: 12px;
  color: #888;
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
