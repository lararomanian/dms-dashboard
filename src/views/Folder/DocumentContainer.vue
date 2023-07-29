<template>
    <div class="document-container" v-if="$can('documents.view')">
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
  .document-item {
  display: flex;
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.document-item:hover {
  background-color: #f0f0f0;
}

  </style>
  