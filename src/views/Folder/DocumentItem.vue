<template>
  <div class="document-item">
    <div class="document-icon">
      <i class="ic-document"></i>
    </div>
    <div class="document-name">{{ document.title }}</div>
    <div class="document-size">{{ formatSize(document.documents[0].size) }}</div>
    <div class="document-actions flex-column">
      <button class="btn btn-sm btn-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCreateDocument"
        aria-controls="offcanvasCreate" @click.prevent="setEditData(document)">
        <i class="ic-edit"></i> Edit
      </button>
      <button class="btn btn-sm btn-danger" @click="deleteDocument">
        <i class="ic-trash"></i> Delete
      </button>
      <button class="btn btn-sm btn-success btn-download">
        <a :href="'http://127.0.0.1:8000/api/documents/' + document.id + '/export'" target="_blank">
        <i class="ic-download">
        </i> 
      </a>
      </button>
    </div>
  </div>
</template>

<script>


export default {
  props: {
    document: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatSize(size) {
      if (size < 1024) return `${size} B`;
      else if (size < 1048576) return `${(size / 1024).toFixed(2)} KB`;
      else return `${(size / 1048576).toFixed(2)} MB`;
    },
    editDocument() {
      this.$emit('edit-document', this.document);
    },
    deleteDocument() {
      this.$emit('delete-document', this.document.id);
    },
    downloadDocument() {
      this.$emit('download-document', this.document.id);
    },
    setEditData(item,editMode = true) {
        this.$root.$emit("EDIT", item,editMode);
    },
  },
  components: {
  },
};
</script>

<style>
  /* The styles for the document item */
  .document-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    min-width: 150px;
    background-color: #fff;
  }

  /* The document icon styles */
  .document-icon {
    font-size: 32px;
    margin-bottom: 8px;
    color: #555;
  }

  /* The document name styles */
  .document-name {
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 4px;
  }

  /* The document size styles */
  .document-size {
    font-size: 12px;
    color: #888;
  }

  /* The document actions container styles */
  .document-actions {
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  /* The button styles */
  .document-actions>button {
    border-radius: 4px;
    padding: 6px 12px;
    font-size: 12px;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    border: none;
    outline: none;
    transition: background-color 0.2s ease;
  }

  /* The primary button styles */
  .document-actions>button.btn-primary {
    background-color: #007bff;
  }

  /* The danger button styles */
  .document-actions>button.btn-danger {
    background-color: #dc3545;
  }

  /* The success button styles */
  .document-actions>button.btn-success {
    background-color: #28a745;
  }

  /* The hover effect for all buttons */
  .document-actions>button:hover {
    background-color: #444;
  }

  /* The link style for the download button */
  .document-actions>button.btn-download {
    background-color: #fff;
    color: #007bff;
  }

  /* The hover effect for the download button */
  .document-actions>button.btn-download:hover {
    background-color: #f5f5f5;
  }
</style>
