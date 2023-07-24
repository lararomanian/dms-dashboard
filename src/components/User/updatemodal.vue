<template>
    <div class="offcanvas offcanvas-end offcanvas-01" id="userdetailmodal" tabindex="-1"
        aria-labelledby="offcanvasCreateLabel">
        <div class="offcanvas-header">
            <h5 class="text-dark" id="offcanvasCreateLabel">{{ mode_title }} </h5>
            <button class="btn btn-danger btn-sm" type="button" data-bs-dismiss="offcanvas" aria-label="Close"
                ref="btnClose">
                <i class="ic-close"></i>
            </button>
        </div>
        <div class="offcanvas-body">
            <div class="row">
                <form class="row align-end" v-on:submit.prevent="submitForm" enctype="multipart/form-data">
                    <template v-if="mode == 'detail'">
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
                    </template>

                    <template v-if="mode == 'password'">

                        <div class="col-md-12 mb-16">
                            <label htmlfor="">Password</label>
                            <div class="form-icon trail">
                                <input class="form-control" v-if="showPassword" type="text" v-model="item.password" />
                                <input class="form-control" v-else type="password" v-model="item.password" />
                                <i :class="{ 'ic-view': showPassword, 'ic-hidden': !showPassword }"
                                    @click="togglePassword('password')"></i>
                            </div>
                            <ErrorSpan :error="errors.password" />
                        </div>

                        <div class="col-md-12 mb-16">
                            <label htmlfor="">Confirm Password</label>
                            <div class="form-icon trail">
                                <input class="form-control" v-if="showPasswordConfirm" type="text"
                                    v-model="item.password_confirmation" />
                                <input class="form-control" v-else type="password"
                                    v-model="item.password_confirmation" />
                                <i :class="{ 'ic-view': showPasswordConfirm, 'ic-hidden': !showPasswordConfirm }"
                                    @click="togglePassword('password_confirmation')"></i>
                            </div>
                        </div>
                    </template>



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
    name: "UserDetailModal",
    mixins: [CreateMixin],
    components: { ErrorSpan },
    data() {
        return {
            url:'usermamangement',
            showPassword: false,
            showPasswordConfirm: false,
            mode: '',
            mode_title:'',
            errors: {},
            fetch_module: 'FETCH_USERs'
        };
    },
    computed: {

    },
    mounted() {
        this.$root.$on('changePassword', (data) => {
            this.item = { ...data };
            this.errors = {};
            this.mode = "password";
            this.mode_title ="Change Password"
        });

        this.$root.$on('changeDetails', (data) => {
            this.item = { ...data };
            this.errors = {};
            this.mode = "detail";
            this.mode_title="Change User Detail"
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
            let formData = {};
            formData.user_id =  this.item.id;
            if(this.mode == "password"){
                formData.password = this.item.password;
                formData.password_confirmation = this.item.password_confirmation;
            }

            if(this.mode == "detail"){
                formData.email = this.item.email;
                formData.name = this.item.name;
            }
            let uri = this.api_url + this.url+"/change"+this.mode;
            this.isLoading = true;
            this.axios.post(uri, formData).then((response) => {
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
  