<template>
  <div class="document-item">
    <div class="document-icon">
      <img :src="getIconPath" :alt="document.title" class="img-small" />
    </div>
    <div class="document-details">
      <span class="document-title">{{ document.title }}</span>
      <div class="document-description" v-html="document.description"></div>
    </div>
    <button class="download-button" >
      <a
        :href="'http://127.0.0.1:8000/api/documents/' + document.id + '/export'"
        target="_blank"
      >
        Download
      </a>
    </button>
  </div>
</template>

<script>
export default {
  props: ['document'],
  computed: {
    getIconPath() {
      const fileExtension = this.getFileExtension(this.document);
      const icon = this.getIconByExtension(fileExtension);
      return require(`@/assets/img/${icon}.png`);
    },
  },
  methods: {
    getFileExtension(fileName) {
      return fileName.documents[0].extension;
    },
    getIconByExtension(extension) {
      switch (extension) {
        case 'pdf':
          return 'pdf';
        case 'doc':
        case 'docx':
          return 'file';
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
          return 'image';
        // Add more cases for other file types as needed
        default:
          return 'pdf'; // Fallback for unknown extensions
      }
    },
    downloadDocument() {
      // Replace this with your download logic based on the document file path
      alert(`Download action for "${this.document.title}"`);
    },
  },
};
</script>

<style>
.document-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.document-item:hover {
  background-color: #f0f0f0;
}

.img-small {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

.document-details {
  flex: 1;
}

.document-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.document-description {
  margin-top: 4px;
  color: #666;
}

.download-button {
  margin-left: 10px;
  padding: 8px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.download-button:hover {
  background-color: #0056b3;
}

.download-button:focus {
  outline: none;
}
</style>
