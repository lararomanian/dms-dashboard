<template>
    <div class="alert alert-primary alert-dismissible fade show" role="alert">
        <a :href="file" target="_blank" class="mr-auto">
            <i class="ic-file"></i> File
        </a>
        <span> <i class="ic-close close  " @click="clearUploadedFile"></i> </span>
    </div>
</template>

<script>
export default {
    name: 'UploadedFile',
    props: {
        'file': { type: String },
        'clearUploadedFile': { type: Function },
     
    },


};
</script>

<style scoped>
.close {
    color: red;
    cursor: pointer;
}
</style>