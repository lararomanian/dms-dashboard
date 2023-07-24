<script>
export default {
    name: 'PaginationMixin',
    data() {
        return {
            options: [10, 20, 30],
            pageCount: 0,
            paginationDetail: {
                current_page: "",
                from: "",
                to: "",
                total: "",
                last_page: 0,
                per_page: 0,
                links: [],
                first: '',
                last: '',
                next: '',
                prev: '',
            },
        };
    },
    methods: {
        async handlePagination(pageNum) {
            const newParams = { ...this.params };
            newParams.page = pageNum;
            let uri = this.api_url + this.url;
            try {
                let { data } = await this.axios.get(uri, { params: newParams });
                this.tableData = data.data;
            } catch (error) {
                console.log(error)
            } finally {
                this.isLoading = false
            }
        },
    },
}
</script>