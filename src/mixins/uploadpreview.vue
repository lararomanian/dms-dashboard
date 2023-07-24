<script>
export default {
    name: 'UploadPreviewMixin',

    data() {
        return {
            upload: {
                imgPreview: "",
                status: false
            },
            mode:""
        };
    },
    methods: {
        clearImagePreview() {
            this.upload.imgPreview = ""
            this.upload.status = false
        },
    },
};
</script>