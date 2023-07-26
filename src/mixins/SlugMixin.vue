<script>
export default {
    name: 'SlugMixin',
    methods: {
        createSlug(data) {
            this.item.slug = data
                .toLowerCase()
                .replace(/[^\w ]+/g, "")
                .replace(/ +/g, "-")
                .replace(/^-+/, "")
                .replace(/-+$/, "");
        },

    },
}
</script>