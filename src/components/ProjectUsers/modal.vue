<template>
    <div class="offcanvas offcanvas-end offcanvas-01" id="offcanvasCreate" tabindex="-1"
        aria-labelledby="offcanvasCreateLabel">
        <div class="offcanvas-header">
            <h5 class="text-dark" id="offcanvasCreateLabel">{{ mode }} Project Users</h5>
            <button class="btn btn-danger btn-sm" type="button" data-bs-dismiss="offcanvas" aria-label="Close"
                ref="btnClose">
                <i class="ic-close"></i>
            </button>
        </div>
        <div class="offcanvas-body">
            <div class="row">
                <form class="row align-end" v-on:submit.prevent="submitForm" enctype="multipart/form-data">


                    <div class="col-md-12 mb-16">
                        <label for="">User</label>
                        <select name="project_id" class="form-select" :class="{ 'border-red': errors.user_id }"
                            v-model="item.user_id">
                            <option value="" disabled selected>Select Users</option>
                            <option v-for="item in users" :key="item.id" :value="item.id">{{ item.name }}</option>
                        </select>
                        <span v-if="errors.user_id" class="text-danger mt-2 font-size-13">{{
                            errors.user_id
                        }}</span>
                    </div>

                    <div class="col-md-12 mb-16">
                        <label for="">Project</label>
                        <select name="project_id" class="form-select" :class="{ 'border-red': errors.project_id }"
                            v-model="item.project_id">
                            <option value="" disabled selected>Select Project</option>
                            <option v-for="item in projects" :key="item.id" :value="item.id">{{ item.name }}</option>
                        </select>
                        <span v-if="errors.project_id" class="text-danger mt-2 font-size-13">{{
                            errors.project_id
                        }}</span>
                    </div>

                    <hr>
                    <div class="col-md-12">
                        <button type="button" aria-label="Close" data-bs-dismiss="offcanvas" class="btn btn-red mr-16">
                            <i class="ic-close mr-8"></i>Cancel
                        </button>
                        <button v-if="!isLoading" class="btn btn-green" @click.prevent="submitProjectUserForm">
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
import MediasMixin from "@/mixins/MediasMixin.vue";
import SlugMixin from "@/mixins/SlugMixin.vue";

export default {
    name: "ProjectUsersModal",
    mixins: [CreateMixin, MediasMixin, SlugMixin],
    components: {},
    data() {
        return {
            url: 'usermamangement',
            mode: '',
            isLoading: false,
            item: {},
            isEdit: false,
            errors: {},
            method: "",
            projects: [],
            users: [],
            api_url: process.env.VUE_APP_API_URL,
            storage: process.env.VUE_APP_API_STORAGE,
            fetch_module: 'FETCH_PROEJCT_USERS'
        };
    },

    mounted() {
        this.fetchDocuments();
        this.fetchUsers();

        this.$root.$on('CREATE', () => {
            this.isEdit = false;
            this.item = {
                status: 0,
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

        fetchDocuments() {
            let uri = this.api_url + 'documents/all';
            try {
                this.axios.get(uri).then(({ data }) => {
                    this.projects = data.data;
                });
            } catch (error) {
                console.log(error)
            }
        },

        fetchUsers() {
            let uri = this.api_url + 'usermamangement/all';
            try {
                this.axios.get(uri).then(({ data }) => {
                    this.users = data.data;
                });
            } catch (error) {
                console.log(error)
            }
        },

        submitProjectUserForm() {

            let uri = this.api_url + 'projects/add-user/' + this.item.project_id;
            try {
                this.axios.post(uri, {
                        user_id: this.item.user_id,
                })
                    .then((response) => {
                        console.log(response);  
                    });
            } catch (error) {
                console.log(error)
            }
        }
    },
};
</script>

