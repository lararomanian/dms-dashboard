<template>
    <div class="offcanvas offcanvas-end offcanvas-01" id="offcanvasCreate" tabindex="-1"
        aria-labelledby="offcanvasCreateLabel">
        <div class="offcanvas-header">
            <h5 class="text-dark" id="offcanvasCreateLabel">{{ mode }} User Role SetUp</h5>
            <button class="btn btn-danger btn-sm" type="button" data-bs-dismiss="offcanvas" aria-label="Close"
                ref="btnClose">
                <i class="ic-close"></i>
            </button>
        </div>
        <div class="offcanvas-body">
            <div class="row">
                <form class="row align-end" v-on:submit.prevent="submitForm" enctype="multipart/form-data">
                    <div class="col-md-12 mb-16">
                        <label for=""> User</label>
                        <input class="form-control" type="text" v-model="item.name" disabled>
                        <ErrorSpan :error="errors.name" />
                    </div>

                    <div class="col-md-12 mb-16">
                        <label for=""> Role</label>


                        <select name="roles" id="roles" v-model="item.role_id" class="form-select"
                            :class="{ 'border-red': errors.type }">

                            <option value="">No Role</option>
                            <option :value="role.id" v-for="(role, index) in roles" :key="index">{{ role.name }}
                            </option>

                        </select>
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

export default {
    name: "UserRoleModal",
    mixins: [CreateMixin],
    components: { ErrorSpan },
    props: ['users', 'roles'],
    data() {
        return {
            url: 'user-role',
            mode: "",
            fetch_module: 'FETCH_USER_ROLES'
        };
    },

    mounted() {
        this.$root.$on('EDIT', (data) => {
            this.isEdit = true;
            this.item = { ...data };
            this.errors = {};
            this.mode = "Edit";
        });
    },



    methods: {
    },
};
</script>

<style scoped>

</style>
