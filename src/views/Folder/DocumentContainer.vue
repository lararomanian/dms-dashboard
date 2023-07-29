<template>
    <div class="document-container">
      <div v-for="document in documents" :key="document.id">
        <DocumentItem :document="document" />
      </div>
    </div>
  </template>
  
  <script>
  import DocumentItem from './DocumentItem.vue';
  
  export default {
    props: ['documents'],
    components: {
      DocumentItem,
    },
  };
  </script>
  
  <style>
  .document-container {
    padding-left: 24px;
  }
  
  .document-item {
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.document-item:hover {
  background-color: #f0f0f0;
}
  </style>
  