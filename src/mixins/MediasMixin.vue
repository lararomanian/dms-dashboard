<script>
export default {
    name: 'MediasMixin',
    methods: {
        handleImageUpload() {
            let file = this.$refs.image.files[0];
            this.upload.status = true;
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                this.upload.imgPreview = reader.result;
            }, false);

            if (file) {
                reader.readAsDataURL(file);
                this.item.image = file;
            }
        },
        handleFileUpload(e) {
            const [file] = e.target.files;
            this.item.file = file;
        },
        clearselectedFiles() {
            if (this.$refs.file) {
                this.$refs.file.value = null
            }
            if (this.$refs.image) {
                this.$refs.image.value = null
                this.upload.status = false
            }
        },

        clearUploadedImage() {
            if (this.item.image) {
                this.item.image = null;
            }
        },
        clearUploadedFile() {
            if (this.item.file) {
                this.item.file = null;
            }
        },

    },
}
</script>