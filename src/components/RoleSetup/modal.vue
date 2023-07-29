<template>
    <div class="offcanvas offcanvas-end offcanvas-01" id="offcanvasCreate" tabindex="-1"
        aria-labelledby="offcanvasCreateLabel">
        <div class="offcanvas-header">
            <h5 class="text-dark" id="offcanvasCreateLabel">{{ mode }} Role SetUp</h5>
            <button class="btn btn-danger btn-sm" type="button" data-bs-dismiss="offcanvas" aria-label="Close"
                ref="btnClose">
                <i class="ic-close"></i>
            </button>
        </div>
        <div class="offcanvas-body">
            <div class="row">
                <form class="row align-end" v-on:submit.prevent="submitForm" enctype="multipart/form-data">
                    <div class="col-md-12 mb-16">
                        <label for=""> Name</label>
                        <input class="form-control" type="text" v-model="name">
                        <ErrorSpan :error="errors.name" />
                    </div>

                    <div class="col-md-12 row mb-16">
                        <label for="">Permissions:
                            <button type="button" class="btn btn-primary btn-bulb" @click="selectAll"><i
                                    :class="toggle_class"></i></button></label>

                        <ErrorSpan :error="errors.permissions" />
                        <br>
                        <div class="col-4 mt-1" v-for="(title, index) in permission_titles " :key="index">
                            <label for="">{{ translateRole(title) }}</label>
                            <div class="form-check" v-for="(action, i) in actions" :key="i">
                                <input class="form-check-input" type="checkbox" :value="title + '.' + action"
                                    :id="title + '.' + action" @change="togglePermission(title.concat('.', action))"
                                    :checked="isSelected(title.concat('.', action))">
                                <label class="form-check-label" for="flexCheckDefault"
                                    style="text-transform:capitalize">
                                    {{ action }}
                                </label>
                            </div>
                            <hr>
                        </div>
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
import { translateRole } from "@/plugins/translateRole";

export default {
    name: "RoleSetUpModal",
    mixins: [CreateMixin],
    components: { ErrorSpan },
    props: ['permission_lists', 'permission_titles'],
    data() {
        return {
            url: 'rolepermission',
            mode: "",
            actions: ['create', 'update', 'view', 'delete'],
            id: '',
            name: '',
            allowed_permissions: [],
            toggle_class: 'ic-check-circle',
            fetch_module: 'FETCH_ROLE_SETUPs'
        };
    },

    mounted() {
        this.$root.$on('CREATE', () => {
            this.isEdit = false;
            this.name = '';
            this.id = ''
            this.allowed_permissions = [];
            this.errors = {};
            this.mode = "Add";
        });

        this.$root.$on('EDIT', (data) => {
            this.isEdit = true;
            this.name = data.name;
            this.id = data.id;
            this.allowed_permissions = data.permissions;
            this.errors = {};
            this.mode = "Edit";
        });
    },
    watch: {

        allowed_permissions(newPermissions) {

            if (newPermissions.length > 0) {
                this.toggle_class = 'ic-close';
            } else {
                this.toggle_class = 'ic-check-circle';
            }


        }
    },

    methods: {
        translateRole,
        togglePermission(permission) {
            if (this.allowed_permissions.includes(permission)) {
                this.allowed_permissions = this.allowed_permissions.filter(item => item !== permission)
            }
            else {
                this.allowed_permissions.push(permission);
            }
        },

        selectAll() {
            if (this.allowed_permissions.length > 0) {
                this.allowed_permissions = [];
            }
            else {
                this.permission_titles.forEach(p => {
                    this.actions.forEach(a => {
                        this.togglePermission(p.concat('.', a));
                    });
                });
            }

        },

        isSelected(permission) {
            if (this.allowed_permissions.includes(permission))
                return true;

            return false;
        },

        submitForm() {
            let uri = this.api_url + this.url + (this.isEdit ? '/update' : '/store');
            this.isLoading = true;

            const payload = {
                name: this.name,
                permissions: this.allowed_permissions
            }
            if (this.id != '') {
                payload.id = this.id;
            }

            this.axios.post(uri, payload
            ).then((response) => {
                this.isLoading = false;
                this.$toast.success(response.data.message, {
                    position: "bottom-right",
                });
                this.$refs.btnClose.click();
                this.$root.$emit('FETCH_ROLE_SETUPs');
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
