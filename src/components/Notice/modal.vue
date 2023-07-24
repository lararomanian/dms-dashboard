<template>
    <div class="offcanvas offcanvas-end offcanvas-01" id="offcanvasCreate" tabindex="-1"
        aria-labelledby="offcanvasCreateLabel">
        <div class="offcanvas-header">
            <h5 class="text-dark" id="offcanvasCreateLabel">{{ mode }} Notice</h5>
            <button class="btn btn-danger btn-sm" type="button" data-bs-dismiss="offcanvas" aria-label="Close"
                ref="btnClose">
                <i class="ic-close"></i>
            </button>
        </div>
        <div class="offcanvas-body">
            <div class="row">
                <form class="row align-end" v-on:submit.prevent="submitForm" enctype="multipart/form-data">
                    <div class="col-md-6 mb-16">
                        <label for="">Title</label>
                        <input type="text" class="form-control" :class="{ 'border-red': errors.title }"
                            v-model="item.title" @input="createSlug" />
                        <span v-if="errors.title" class="text-danger mt-2 font-size-13">{{ errors.title }}</span>
                    </div>
                    <div class="col-md-6 mb-16">
                        <label for="">Slug</label>
                        <input type="text" class="form-control" :class="{ 'border-red': errors.slug }"
                            v-model="item.slug" />
                        <span v-if="errors.slug" class="text-danger mt-2 font-size-13">{{ errors.slug }}</span>
                    </div>

                    <div class="col-md-6 mb-16">
                        <label for="">Category</label>
                        <select name="notice_category_id" class="form-select"
                            :class="{ 'border-red': errors.notice_category_id }" v-model="item.notice_category_id">
                            <option value="" disabled selected>Select Parent</option>
                            <option v-for="item in categories" :key="item.id" :value="item.id">{{ item.title }}</option>
                        </select>
                        <span v-if="errors.notice_category_id" class="text-danger mt-2 font-size-13">{{
                            errors.notice_category_id
                        }}</span>
                    </div>

                    <div class="row mb-16">
                        <label for="">Image</label>
                        <input type="file" class="form-control" ref="image" @input="handleImageUpload" />
                        <div class="col-md-6 mt-16" v-if="upload.status == false">
                            <UploadedImg :file='(storage + item.image)' :clearUploadedFile="clearUploadedImage"
                                v-if="(mode === 'Edit' && item.image)" />
                        </div>
                        <div class="col-md-6 mt-16" v-else>
                            <img :src="upload.imgPreview" alt="" height="100" width="100">
                        </div>
                        <ErrorSpan :error="errors.image" />
                    </div>

                    <div class="row mb-16">
                        <div class="col-md-6 ">
                            <label for="">File</label>
                            <UploadedFile :file='storage + item.file' :clearUploadedFile="clearUploadedFile"
                                v-if="mode === 'Edit' && item.file" />
                            <input type="file" class="form-control" ref="file" @input="handleFileUpload" v-else />
                        </div>
                        <ErrorSpan :error="errors.file" />
                    </div>

                    <div class="col-md-6 mb-16">
                        <label for="">Display Order</label>
                        <input type="number" min="1" @input="item.order_by = item.order_by < 1 ? '' : item.order_by"
                            class="form-control" :class="{ 'border-red': errors.order_by }" v-model="item.order_by" />
                        <span v-if="errors.order_by" class="text-danger font-size-13">{{ errors.order_by }}</span>
                    </div>

                    <div class="col-md-6 mb-16">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" true-value="1" false-value="0"
                                v-model="item.status" />
                            <label class="form-check-label" for="flexSwitchCheckDefault">Status</label>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <button type="button" aria-label="Close" @click="closeForm" class="btn btn-red mr-16">
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
import UploadedFile from "@/components/Utility/UploadedFile.vue";
import UploadedImg from "@/components/Utility/UploadedImg.vue";
import ErrorSpan from "@/components/errorspan.vue";
import MediasMixin from "@/mixins/MediasMixin.vue";
import SlugMixin from "@/mixins/SlugMixin.vue";


export default {
    name: "NoticeModal",
    components: {
        UploadedImg,
        UploadedFile,
        ErrorSpan
    },
    mixins: [CreateMixin, UploadPreviewMixin, MediasMixin,SlugMixin],
    data() {
        return {
            url: 'notice',
            fetch_module: 'FETCH_NOTICES',
            categories: [],
        };
    },

    mounted() {
        this.axios.get(process.env.VUE_APP_API_URL + this.url + '/categories').then(({ data }) => {
            this.categories = data.categories;
        });
        this.$root.$on('CREATE', () => {
            this.item = {};
            this.isEdit = false;
            this.mode = "Add";
            this.errors = {};
            this.clearselectedFiles();
        });

        this.$root.$on('EDIT', (data) => {
            this.errors = {};
            this.isEdit = true;
            this.item = { ...data };
            this.mode = "Edit";
            this.clearselectedFiles();
        });

    },
    methods: {
        closeForm() {
            this.$refs.btnClose.click();
        }
    },
};
</script>

<style scoped>

</style>
