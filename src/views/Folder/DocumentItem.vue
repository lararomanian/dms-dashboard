<template>
  <div class="document-item">
    <div class="document-icon">
      <img :src="getIconPath" :alt="document.title" class="img-small" />
    </div>
    <div class="document-details">
      <span class="document-title">{{ document.title }}</span>
      <div class="document-description" v-html="document.description"></div>
    </div>
    <div class="buttons-container">
      <button class="download-button" @click="downloadDocument">
        <a :href="'http://127.0.0.1:8000/api/documents/' + document.id + '/export'" target="_blank">
          Download
        </a>
      </button>

      <div class="delete-button" v-if="$can('documents.delete')" style="width: auto;">
        <button >
          <i class="ic-delete"  @click="deleteDocument(this.folderr)"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>

// import axios from 'axios';

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
   
    deleteDocument(data) {
      
      console.log(data, "doc id");

      // axios.delete(`http://127.0.0.1:8000/api/documents/delete/${this.document.id}`).then((response) => {
      //   console.log(response);
      //   this.$root.$emit('REFRESH');
      //   this.$toast.success(response.data.message, {
      //     position: "bottom-right",
      //   });

      //   this.$router.push({
      //     path: `/`,
      //   });
      // }).catch((error) => {
      //   console.log(error);
      //   this.$toast.error(error.response.data.message, {
      //     position: "bottom-right",
      //   });
      // });
    }
  },
};
</script>


<style scoped>
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

.buttons-container {
  display: flex;
  align-items: center;
}

.download-button {
  padding: 8px 12px;
  margin-right: 10px;
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

.delete-button {
  display: flex;
  align-items: center;
}

button {
  background-color: #ff0000;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
}

button:hover {
  background-color: #cc0000;
}
</style>
<!-- <style>
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


.document-info {
  flex: 1;
  padding-right: 8px;
}

.delete-button {
  display: flex;
  align-items: center;
}

button {
  background-color: #ff0000;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
}

button:hover {
  background-color: #cc0000;
}
</style> -->
