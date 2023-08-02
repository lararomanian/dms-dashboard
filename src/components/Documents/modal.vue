<template>
    <div class="offcanvas offcanvas-end offcanvas-01" id="offcanvasCreate" tabindex="-1"
        aria-labelledby="offcanvasCreateLabel">
        <div class="offcanvas-header">
            <h5 class="text-dark" id="offcanvasCreateLabel">{{ mode }} Documents</h5>
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
                        <input type="text" class="form-control" v-model="item.title" @input="createSlug(item.title)" />
                        <ErrorSpan :error="errors.title" />
                    </div>

                    <div class="col-md-12 mb-16">
                        <label for="">Slug</label>
                        <input type="text" class="form-control" v-model="item.slug" />
                        <ErrorSpan :error="errors.slug" />
                    </div>

                    <div class="col-md-6 mb-16">
                        <label for="">Project</label>
                        <select name="project_id" class="form-select" :class="{ 'border-red': errors.project_id }" disabled 
                            v-model="item.project_id">
                            <option value="" disabled selected>Select Project</option>
                            <option v-for="item in projects" :key="item.id" :value="item.id">{{ item.name }}</option>
                        </select>
                        <span v-if="errors.project_id" class="text-danger mt-2 font-size-13">{{
                            errors.project_id
                        }}</span>
                    </div>

                    <div class="col-md-6 mb-16" v-if="mode != 'Edit'">
                        <label for="">Language</label>
                        <select name="lang" class="form-select" :class="{ 'border-red': errors.lang }" v-model="item.lang">
                            <option value="" disabled selected>Select Language</option>
                            <option value="eng">English</option>
                            <option value="nep">Nepali</option>
                        </select>
                        <span v-if="errors.lang" class="text-danger mt-2 font-size-13">{{
                            errors.lang
                        }}</span>
                    </div>

                    <div class="col-md-12 mb-16">
                        <label for="">Description</label>
                        <ckeditor v-model="item.description"></ckeditor>
                        <span v-if="errors.description" class="text-danger mt-2 font-size-13">{{
                            errors.description
                        }}</span>
                    </div>

                    <div class="col-md-12 mb-16" v-if="mode == 'Edit'">
                        <label for="">OCR Text</label>
                        <ckeditor v-model="item.ocr_text"></ckeditor>
                        <span v-if="errors.ocr_text" class="text-danger mt-2 font-size-13">{{
                            errors.ocr_text
                        }}</span>
                    </div>

                    <div class="row mb-16">
                        <div class="col-md-6 ">
                            <label for="">File</label>
                            <UploadedFile :file='storage + item.documents' :clearUploadedFile="clearUploadedFile"
                                v-if="mode === 'Edit' && item.documents" />
                            <input type="file" class="form-control" ref="file" @input="handleFileUpload" v-else />
                        </div>
                        <ErrorSpan :error="errors.documents" />
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
import MediasMixin from "@/mixins/MediasMixin.vue";
import CKEditor from 'ckeditor4-vue';
import SlugMixin from "@/mixins/SlugMixin.vue";
import UploadedFile from "@/components/Utility/UploadedFile.vue";

export default {
    name: "DocumentModal",
    mixins: [CreateMixin, MediasMixin, SlugMixin],
    components: { UploadedFile, ErrorSpan, ckeditor: CKEditor.component },
    props: ['main_project_id', 'main_folder_id'],
    data() {
        return {
            url: 'documents',
            mode: '',
            isLoading: false,
            item: {
                folder_id: 18
            },
            isEdit: false,
            errors: {},
            method: "",
            ocr_text: "",
            projects: [],
            api_url: process.env.VUE_APP_API_URL,
            storage: process.env.VUE_APP_API_STORAGE,
            fetch_module: 'FETCH_DOCUMENTS',

        };
    },

    mounted() {
        this.fetchDocuments();

        this.$root.$on('CREATE', () => {
            this.isEdit = false;
            this.item = {
                status: 0,
                project_id: this.main_project_id,
                folder_id: this.main_folder_id,
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
            console.log("ocr_text", this.item.ocr_text)
        });

    },
    computed: {
        // formattedText() {
        //     return this.formatText(this.item.ocr_text);
        // },
    },
    methods: {
        formatText(inputText) {
            let formattedText = inputText.replace(/\n\n/g, '<p></p>');
            formattedText = formattedText.replace(/\n/g, '<br>');
            return formattedText;
        },
        fetchDocuments() {
            let uri = this.api_url + this.url + '/all';
            try {
                this.axios.get(uri).then(({ data }) => {
                    console.log(data, "projects");
                    this.projects = data.data;
                });
            } catch (error) {
                console.log(error)
            }
        }
    },
};
</script>

