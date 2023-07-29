<template>
    <flex-layout>
      <FolderContainer v-if="foldersData.length > 0" :folders="foldersData" @folder-clicked="openFolder" @back="goBack" :project_id="this.project_fetch_id"/>
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
        link_types: {},
        menu_types: {},
        parents: {},
        foldersData: [],
        currentFolderId: null, // Assuming 1 is the root folder ID
        previousFolderId: null,
        tableHeading: [
          {
            heading: "Title",
          },
          {
            heading: "Status",
          },
        ],
      };
    },
    mounted() {
      // Fetch the root folder initially when the component is mounted
      this.fetchFolderData(this.project_fetch_id);
    },
//     watch: {
//     // Watch for changes in the route parameters and fetch the appropriate data
//     $route: {
//       immediate: true, // Run the watch handler immediately on mount
//       handler(newRoute, oldRoute) {
//         if (newRoute.params.projectId !== oldRoute.params.projectId) {
//           // Fetch data if the projectId parameter has changed
//           this.fetchFolderData(Number(newRoute.params.projectId));
//         }
//       },
//     },
//   },
watch: {
        '$route': function (val) {
            console.log(val);
            this.fetchFolderData(val.params.id);
        }
    },
    methods: {
      openFolder(folder) {
        if (folder.subfolders.length === 0) {
          // Folder does not have subfolders, fetch documents (if any) and display them
          this.fetchDocuments(folder);
        } else {
          // Folder has subfolders, display them
          this.foldersData = folder.subfolders;
          this.previousFolderId = this.currentFolderId; // Store the current folder ID as the previous folder ID
          this.currentFolderId = folder.id; // Update the current folder ID
        }
      },
      fetchDocuments(folder) {
        const documents = folder.documents; // Retrieve documents from the API response
        folder.subfolders = []; // Clear subfolders to display documents instead
  
        this.foldersData = [folder];
        folder.documents = documents;
      },
    //   fetchFolderData(folderId) {
    //     // Make an HTTP request to fetch the folder data from the API using the prop value
    //     axios
    //       .get(`http://127.0.0.1:8000/api/folders/${folderId}`)
    //       .then((response) => {
    //         // Update the component with the fetched folder data
    //         this.foldersData = response.data.data;
    //       })
    //       .catch((error) => {
    //         console.error('Error fetching folder data:', error);
    //       });
    //   },
      goBack() {
        if (this.previousFolderId !== null) {
          // Fetch the parent folder data using the previous folder ID
          this.fetchFolderData(this.previousFolderId);
          // Reset the current folder ID to the parent folder ID
          this.currentFolderId = this.previousFolderId;
          // Clear the previous folder ID as we are currently displaying the parent folder
          this.previousFolderId = null;
        } else {
          // If there is no previous folder ID, we are at the root folder
          // Fetch the root folder data again
          this.fetchFolderData(1); // Assuming 1 is the root folder ID
          // Reset the current folder ID to the root folder ID
          this.currentFolderId = 1;
        }
        //route to /files
  
      },
      fetchFolderData(folderId) {
      this.isLoading = true; // Set isLoading to true while fetching data
      // Make an HTTP request to fetch the folder data from the API using the folderId
      axios
        .get(`http://127.0.0.1:8000/api/folders/${folderId}`)
        .then((response) => {
          // Update the component with the fetched folder data
          this.foldersData = response.data.data;
          this.isLoading = false; // Set isLoading to false after data is fetched
        })
        .catch((error) => {
          console.error('Error fetching folder data:', error);
          this.isLoading = false; // Set isLoading to false if there's an error
        });
    },
    },
  };
  </script>
  