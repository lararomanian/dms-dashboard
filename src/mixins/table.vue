<script>
export default {
    name: 'TableMixin',

    data() {
        return {
            storage: process.env.VUE_APP_API_STORAGE,
            api_url: process.env.VUE_APP_API_URL,
            tableData: [],
            isLoading: true,
            enabled: true,
            params: {
                search: "",
                sort: "",
                filters: {
                from_date: "",
                to_date: "",
                },
                per_page: 10,
            },
            sorts: {
                "a-z": "Alphabetically A-Z",
                "n-o": "Newest to Oldest",
                "o-n": "Oldest to Newest",
            },
        };
    },
  props: ["tableHeading"],
  
  created() {
    this.fetchData();
    this.$root.$on(this.fetch_module, (url = null) => {
      this.fetchData(url);
    });
  },

  watch: {
    params: {
     handler(){
       this.fetchData();
     },
     deep: true
    }
  },
  methods: {
    // fetchData(url = null) {
    //     let uri = url ? url : this.api_url+ this.url;
    //     this.isLoading = true;
    //     this.axios.get(uri, { params: this.params }).then((response) => {
    //     this.tableData = response.data.data;
    //     this.$root.$emit("paginate", response.data);
    //     this.isLoading = false;
    //     });
    // },

    fetchData() {
            let uri = this.api_url + this.url;
            this.isLoading = true
            try {
                this.axios.get(uri, { params: this.params }).then(({ data }) => {
                    this.paginationDetail = data.meta;
                    this.pageCount = Math.ceil(this.paginationDetail.total / this.paginationDetail.per_page);
                    this.tableData = data.data;
                    this.isLoading = false;
                });
            } catch (error) {
                console.log(error)
            } 
            // finally {
            //     this.isLoading = false
            // }
    },

    sortBy(order) {
        this.params.sort = order;
    },

    resetFilters() {
        this.params.filters.from_date = "";
        this.params.filters.to_date = "";
    },

    setEditData(item,editMode = true) {
        this.$root.$emit("EDIT", item,editMode);
    },


    deleteData(id) {
        let url = this.api_url + this.url + "/delete/" + id;
        this.axios
        .delete(url)
        .then((response) => {
            this.$toast.success(response.data.message, {
            position: "bottom-right",
            });
            this.fetchData();
        })
        .catch((error) => {
            console.log(error);
            this.$toast.error("Error Deleting Data !!", {
            position: "bottom-right",
            });
        });
    },
    },
  

}
</script>