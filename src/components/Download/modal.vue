<template>
    <div class="offcanvas offcanvas-end offcanvas-01" id="offcanvasCreate" tabindex="-1"
        aria-labelledby="offcanvasCreateLabel">
        <div class="offcanvas-header">
            <h5 class="text-dark" id="offcanvasCreateLabel">{{ mode }} Download </h5>
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
                        <input type="text" class="form-control" v-model="item.title" @input="createSlug" />
                        <ErrorSpan :error="errors.title" />
                    </div>

                    <div class="col-md-12 mb-16">
                        <label for="">Slug</label>
                        <input type="text" class="form-control" v-model="item.slug" />
                        <ErrorSpan :error="errors.slug" />
                    </div>

                    <div class="col-md-6 mb-16">
                        <label for="">Category</label>
                        <select name="category_id" class="form-select" :class="{ 'border-red': errors.category_id }"
                            v-model="item.category_id">
                            <option value="" disabled selected>Select Parent</option>
                            <option v-for="item in categories" :key="item.id" :value="item.id">{{ item.title }}</option>
                        </select>
                        <span v-if="errors.category_id" class="text-danger mt-2 font-size-13">{{
                            errors.category_id
                        }}</span>
                    </div>
                    <div class="row mb-16">
                        <div class="col-md-6 ">
                            <label for="">File</label>
                            <UploadedFile :file='storage + item.file' :clearUploadedFile="clearUploadedFile"  v-if="mode === 'Edit' && item.file" />
                            <input  type="file" class="form-control" ref="file" @input="handleFileUpload"  v-else />
                        </div>
                        <ErrorSpan :error="errors.file" />
                    </div>

                    <div class="col-md-12 mb-16">
                        <label for="">Link</label>
                        <input type="text" class="form-control" v-model="item.link" />
                        <ErrorSpan :error="errors.link" />
                    </div>

                    <div class="col-md-6 mb-16">
                        <label for="">Display Order</label>
                        <input type="number" min="1" @input="item.order_by = item.order_by < 1 ? '' : item.order_by"
                            class="form-control" :class="{ 'border-red': errors.order_by }" v-model="item.order_by" />
                        <ErrorSpan :error="errors.order_by" />
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
import ErrorSpan from "@/components/errorspan.vue";
import UploadPreviewMixin from "@/mixins/uploadpreview.vue";
import UploadedFile from "@/components/Utility/UploadedFile.vue";
import MediasMixin from "@/mixins/MediasMixin.vue";
import SlugMixin from "@/mixins/SlugMixin.vue";


export default {
    name: "DownloadModal",
    mixins: [CreateMixin, UploadPreviewMixin, MediasMixin,SlugMixin],
    components: {
        UploadedFile, ErrorSpan
    },
    data() {
        return {
            url: 'download',
            mode: "",
            fetch_module: 'FETCH_DOWNLOAD',
            categories: [],
        };
    },

    mounted() {
        this.axios.get(process.env.VUE_APP_API_URL + 'download/categories').then((response) => {
            this.categories = response.data.categories;
        });


        this.$root.$on('CREATE', () => {
            this.isEdit = false;
            this.errors = {};
            this.mode = "Add";
            this.clearselectedFiles();

        });

        this.$root.$on('EDIT', (data) => {
            this.isEdit = true;
            this.item = { ...data };
            this.errors = {};
            this.mode = "Edit";
            this.clearselectedFiles();

        });
    },

};
</script>
