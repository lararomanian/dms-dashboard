<template>
  <div class="document-container">
    <h6 class="folder-title">Documents</h6>
    <div class="documents-list">
      <DocumentItem
        v-for="document in documents"
        :key="document.id"
        :document="document"
        @edit-document="editDocumentHandler"
        @delete-document="deleteDocumentHandler"
        @download-document="downloadDocumentHandler"
      />
    </div>
  </div>
</template>

<script>
import DocumentItem from './DocumentItem.vue';

export default {
  props: ['documents'], // Pass documents as a prop
  components: {
    DocumentItem,
  },
  methods: {
    // Implement the handlers for edit, delete, and download actions
    editDocumentHandler(document) {
      // Handle edit action
      console.log('Edit document:', document);
      // Open the DocumentModal with the document data for editing
    },
    deleteDocumentHandler(documentId) {
      // Handle delete action
      console.log('Delete document with ID:', documentId);
      // Make an API call to delete the document with the given ID
      // Handle any success or error responses accordingly
    },
    downloadDocumentHandler(documentId) {
      // Handle download action
      console.log('Download document with ID:', documentId);
      // Make an API call to download the document with the given ID
      // Handle any success or error responses accordingly
    },
  },
};
</script>

<style>
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
}

.documents-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
}

/* Add any additional styling for DocumentContainer items here */
</style>
