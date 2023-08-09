<template>
  <flex-layout>
    <FolderContainer
      v-if="foldersData.length > 0"
      :folders="foldersData"
      @folder-clicked="openFolder"
      @back="goBack"
      :project_id="project_fetch_id"
    />
  </flex-layout>
</template>

<script>
import axios from 'axios';
import FlexLayout from "@/components/Layout/FlexLayout.vue";
import FolderContainer from './FolderContainer.vue';

export default {
  name: "Folder",
  components: {
    FlexLayout,
    FolderContainer,
  },
  props: {
    project_fetch_id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      foldersData: [],
      currentFolderId: 1, // Assuming 1 is the root folder ID
      previousFolderId: null,
      tableHeading: [
        { heading: "Title" },
        { heading: "Status" },
      ],
      isLoading: false,
    };
  },
  async mounted() {
    await this.fetchFolderData(this.project_fetch_id);
  },
  watch: {
    '$route': function (val) {
      this.fetchFolderData(val.params.id);
    }
  },
  methods: {
    async openFolder(folder) {
      if (folder.subfolders.length === 0) {
        this.fetchDocuments(folder);
      } else {
        this.foldersData = folder.subfolders;
        this.previousFolderId = this.currentFolderId;
        this.currentFolderId = folder.id;
      }
    },
    async fetchDocuments(folder) {
      const documents = folder.documents;
      folder.subfolders = [];
      this.foldersData = [folder];
      folder.documents = documents;
    },
    async goBack() {
      if (this.previousFolderId !== null) {
        await this.fetchFolderData(this.previousFolderId);
        this.currentFolderId = this.previousFolderId;
        this.previousFolderId = null;
      } else {
        await this.fetchFolderData(this.project_fetch_id); // Assuming 1 is the root folder ID
        this.currentFolderId = this.project_fetch_id;
      }
    },
    async fetchFolderData(folderId) {
      this.isLoading = true;
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/folders/${folderId}`);
        this.foldersData = response.data.data;
      } catch (error) {
        console.error('Error fetching folder data:', error);
      } finally {
        this.isLoading = false;
      }
    },

  },
};
</script>
