<template>
    <div class="offcanvas offcanvas-end offcanvas-01" id="offcanvasCreateFolder" tabindex="-1"
        aria-labelledby="offcanvasCreateLabel">
        <div class="offcanvas-header">
            <h5 class="text-dark" id="offcanvasCreateLabel">{{ mode }} Folder</h5>
            <button class="btn btn-danger btn-sm" type="button" data-bs-dismiss="offcanvas" aria-label="Close"
                ref="btnClose">
                <i class="ic-close"></i>
            </button>
        </div>
        <div class="offcanvas-body">
            <div class="row">
                <form class="row align-end" v-on:submit.prevent="submitForm" enctype="multipart/form-data">
                    <div class="col-md-12 mb-16">
                        <label for="">Title</label>
                        <input type="text" class="form-control" v-model="item.name" @input="createSlug()" />
                        <ErrorSpan :error="errors.name" />
                    </div>

                    <hr>
                    <div class="col-md-12">
                        <button type="button" aria-label="Close" data-bs-dismiss="offcanvas" class="btn btn-red mr-16">
                            <i class="ic-close mr-8"></i>Cancel
                        </button>
                        <button v-if="!isLoading" class="btn btn-green" type="submit">
                            <i class="ic-checkmark mr-8"></i>Save
                        </button>
                        <button v-else class="btn btn-green" type="button" disabled>
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import CreateMixin from "@/mixins/create.vue"
import ErrorSpan from "@/components/errorspan.vue";
import MediasMixin from "@/mixins/MediasMixin.vue";

export default {
    name: "FolderModal",
    mixins: [CreateMixin, MediasMixin],
    components: { ErrorSpan },
    props: ['parent_id', 'project_id'],
    data() {
        return {
            url: 'folders',
            mode: '',
            isLoading: false,   
            item: {},   
            isEdit: false,
            errors: {},
            method: "",
            api_url: process.env.VUE_APP_API_URL,
            storage: process.env.VUE_APP_API_STORAGE,
            fetch_module: 'FETCH_FOLDERS'
        };
    },

    mounted() {
        this.$root.$on('CREATE', () => {
            this.isEdit = false;
            this.item = {
                status: 0,
                parent_id: this.parent_id || null,
                project_id: this.project_id,
            };
            this.errors = {};
            this.mode = "Add";
            this.clearselectedFiles();
        });

        this.$root.$on('EDIT', (data) => {
            this.isEdit = true;
            this.errors = {};
            this.item = { ...data };
            this.clearselectedFiles();
            this.mode = "Edit";
        });

    },
    methods: {
     
    },
};
</script>

