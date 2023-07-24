<template>
    <div class="offcanvas offcanvas-end offcanvas-01" id="offcanvasCreate" tabindex="-1"
        aria-labelledby="offcanvasCreateLabel">
        <div class="offcanvas-header">
            <h5 class="text-dark" id="offcanvasCreateLabel">{{ mode }} PopUp</h5>
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
                        <input type="text" class="form-control" v-model="item.title" />
                        <ErrorSpan :error="errors.title" />
                    </div>
                    <div class="row mb-16">
                        <div class="col-md-6 ">
                            <label for="">Image</label>
                            <input type="file" class="form-control" ref="image" v-on:change='handleImageUpload()' />
                            <ErrorSpan :error="errors.image" />
                        </div>

                        <div class="col-md-6 mt-16" v-if="upload.status == false">
                            <a v-if="item.image" :href="storage + item.image" target="_blank">
                                <img :src="storage + item.image" alt="" height="50" width="50">
                            </a>
                        </div>
                        <div class="col-md-6 mt-16" v-else>
                            <img :src="upload.imgPreview" alt="" height="50" width="50">
                        </div>
                    </div>
                    <div class="col-md-6 mb-16">
                        <label for="">Display Order</label>
                        <input type="number" min="1"
                            @input="item.display_order = item.display_order < 1 ? '' : item.display_order" class="form-control"
                            :class="{ 'border-red': errors.display_order }" v-model="item.display_order" />
                        <ErrorSpan :error="errors.display_order" />
                    </div>

                    <div class="col-md-6 mb-16">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault1"
                                v-model="item.status" true-value="1" false-value="0" />
                            <label class="form-check-label" for="flexSwitchCheckDefault">Status</label>
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
import UploadPreviewMixin from "@/mixins/uploadpreview.vue";
import ErrorSpan from "@/components/errorspan.vue";
import MediasMixin from "@/mixins/MediasMixin.vue";


export default {
    name: "PopUpModal",
    mixins: [CreateMixin, UploadPreviewMixin, MediasMixin],
    components: { ErrorSpan },
    data() {
        return {
            url: 'popup',
            mode: '',
            fetch_module: 'FETCH_POPUPS'
        };
    },

    mounted() {
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

        // closeForm() {
        //     this.$refs.btnClose.click();
        // }
    },
};
</script>

