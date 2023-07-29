<template>
    <div class="offcanvas offcanvas-end offcanvas-01" id="offcanvasCreate" tabindex="-1"
        aria-labelledby="offcanvasCreateLabel">
        <div class="offcanvas-header">
            <h5 class="text-dark" id="offcanvasCreateLabel">{{ mode }} User</h5>
            <button class="btn btn-danger btn-sm" type="button" data-bs-dismiss="offcanvas" aria-label="Close"
                ref="btnClose">
                <i class="ic-close"></i>
            </button>
        </div>
        <div class="offcanvas-body">
            <div class="row">
                <form class="row align-end" v-on:submit.prevent="submitForm" enctype="multipart/form-data">
                    <div class="col-md-12 mb-16">
                        <label for="">Name</label>
                        <input type="text" class="form-control" v-model="item.name" />
                        <ErrorSpan :error="errors.name" />
                    </div>

                    <div class="col-md-12 mb-16">
                        <label for="">Email</label>
                        <input type="text" class="form-control" v-model="item.email" />
                        <ErrorSpan :error="errors.email" />
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

export default {
    name: "UserModal",
    mixins: [CreateMixin],
    components: { ErrorSpan },
    data() {
        return {
            url: 'register',
            showPassword: false,
            showPasswordConfirm: false,
            mode: '',
            errors: {},
            fetch_module:'FETCH_USERs'
        };
    },
    computed: {

    },
    mounted() {
        this.$root.$on('CREATE', () => {
            this.isEdit = false;
            this.item = {};
            this.errors = {};
            this.mode = "Add";
        });

        this.$root.$on('EDIT', (data) => {
            this.isEdit = true;
            this.item = { ...data };
            this.mode = "Edit";
        });

    },
    methods: {
        togglePassword(type) {
            if (type == "password") {
                this.showPassword = !this.showPassword;

            }
            else if (type == "password_confirmation") {
                this.showPasswordConfirm = !this.showPasswordConfirm;

            }
        },
        pushErrors(errors) {
            Object.entries(errors).forEach((element) => {
                let [key, msg] = element;
                this.errors[key] = msg[0];
            });
        },

        submitForm() {
            this.errors = {};
            let uri = this.api_url + this.url;
            this.isLoading = true;
            this.axios.post(uri, this.item).then((response) => {
                this.isLoading = false;
                this.$toast.success(response.data.message, {
                    position: "bottom-right",
                });
                this.$refs.btnClose.click();
                this.$root.$emit(this.fetch_module);
            }).catch((error) => {
                this.isLoading = false;
                if (error.response) {
                    if (error.response.status == 422) {
                        this.pushErrors(error.response.data.errors);
                        this.$toast.error("Please check the form again.", {
                            position: "bottom-right",
                        });
                    }
                }
            });
        },
    },
};
</script>
  
<style scoped>

</style>
  