<template>
    <flex-layout>
        <!-- <page-header heading="Folder" action="Add New" toggle="offcanvas" target="#offcanvasCreate"
            :guard="this.$route.meta.guard"  /> -->
        <FolderContainer :folders="foldersData" @folder-clicked="openFolder" @back="goBack" />
    </flex-layout>
</template>
  
<script>

import axios from 'axios';
import FlexLayout from "@/components/Layout/FlexLayout.vue";
// import PageHeader from "@/components/Utility/PageHeader.vue";
import FolderContainer from './FolderContainer.vue';

export default {
    name: "Folder",
    components: {
        // AbsoluteLayout,
        // PageHeader,
        FlexLayout,
        FolderContainer
    },
    data() {
        return {
            link_types: {},
            menu_types: {},
            parents: {},
            foldersData: [],
            currentFolderId: 2, // Assuming 1 is the root folder ID
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
        this.fetchFolderData(this.currentFolderId);
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
            // Simulate an API call to fetch documents for the clicked folder
            // In a real application, you would make an HTTP request to your API endpoint
            // and retrieve the documents for the folder.
            // For simplicity, we'll just update the folder with sample documents here.

            const documents = folder.documents; // Retrieve documents from the API response
            folder.subfolders = []; // Clear subfolders to display documents instead

            // Update the current folder to display its documents
            this.foldersData = [folder];

            // You may want to set a loading state here while fetching the documents
            setTimeout(() => {
                // After the simulated API call, update the folder with documents
                folder.documents = documents;
            }, 1000); // Simulated delay of 1 second for demonstration purposes
        },
        fetchFolderData(folderId) {
            // Make an HTTP request to fetch the folder data from the API
            axios.get(`http://127.0.0.1:8000/api/folders/${folderId}`)
                .then(response => {
                    // Update the component with the fetched folder data
                    this.foldersData = response.data.data;
                })
                .catch(error => {
                    console.error('Error fetching folder data:', error);
                });
        },
        goBack() {
            // Check if there is a previous folder ID available
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
        },
    },
};
</script>
  