<template>
  <div class="folder-item" @click="handleClick(folder)">
    <div class="folder-icon">
      <img :src="folderIconPath" alt="Folder Icon">
    </div>
    <div>{{ folder.name }}</div>
  </div>
</template>

<script>

export default {
  props: {
    folder: Object,
  },
  methods: {
    handleClick(folder) {
      this.$emit('folder-clicked', folder);
    },
  },
  computed: {
    folderIconPath() {
      return require('@/assets/img/folder.png'); // Updated relative path
    },
  },
};
</script>

<style>
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
</style>
