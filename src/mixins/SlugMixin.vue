<script>
export default {
    name: 'SlugMixin',
    methods: {
        createSlug() {
            this.item.slug = this.item.title
                .toLowerCase()
                .replace(/[^\w ]+/g, "")
                .replace(/ +/g, "-")
                .replace(/^-+/, "")
                .replace(/-+$/, "");
        },

    },
}
</script>