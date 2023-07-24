<template>
    <div class="offcanvas offcanvas-end offcanvas-01" id="offcanvasCreate" tabindex="-1"
        aria-labelledby="offcanvasCreateLabel">
        <div class="offcanvas-header">
            <h5 class="text-dark" id="offcanvasCreateLabel">{{ mode }} Member</h5>
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
                    <div class="col-md-6 mb-16">
                        <label for="">Position</label>
                        <input type="text" class="form-control" v-model="item.position" />
                        <ErrorSpan :error="errors.name" />
                    </div>
                    <div class="col-md-6 mb-16">
                        <label for="">Experience</label>
                        <input type="text" class="form-control" v-model="item.experience" />
                        <ErrorSpan :error="errors.experience" />
                    </div>

                    <div class="col-md-6 mb-16">
                        <label for="">Email</label>
                        <input type="text" class="form-control" v-model="item.email" />
                        <ErrorSpan :error="errors.email" />
                    </div>

                    <div class="col-md-6 mb-16">
                        <label for="">Contact Number</label>
                        <input type="text" class="form-control" v-model="item.contact_number" />
                        <ErrorSpan :error="errors.contact_number" />
                    </div>

                    <div class="col-md-12 mb-16">
                        <label for="">Description</label>
                        <ckeditor v-model="item.description"></ckeditor>
                        <span v-if="errors.description" class="text-danger mt-2 font-size-13">{{
                            errors.description
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

                    <div class="col-md-12 mb-16">
                        <label for="">Links</label>

                        <div class="input-group mb-4">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">@</span>
                            </div>
                            <input type="text" class="form-control" placeholder="Facebook" aria-label="Facebook"
                                v-model="item.link_fb" aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-4">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">@</span>
                            </div>
                            <input type="text" class="form-control" placeholder="Twitter" aria-label="Twitter"
                                v-model="item.link_tw" aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-4">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">@</span>
                            </div>
                            <input type="text" class="form-control" placeholder="Linkedin" aria-label="Linkedin"
                                v-model="item.link_ln" aria-describedby="basic-addon1">
                        </div>

                    </div>
                    <div class="col-md-3 mb-16">
                        <label for="">Display Order</label>
                        <input type="number" min="1" @input="item.order_by = item.order_by < 1 ? '' : item.order_by"
                            class="form-control" :class="{ 'border-red': errors.order_by }" v-model="item.order_by" />
                        <ErrorSpan :error="errors.order_by" />
                    </div>

                    <div class="col-md-6 mb-16">
                        <label for="">Member Type</label>
                        <select name="category_id" class="form-select" :class="{ 'border-red': errors.member_type }"
                            v-model="item.member_type">
                            <option value="" selected>Select Type</option>
                            <option v-for="(type, key) in types" :key="key" :value="type.id">{{ type.type }}</option>
                        </select>
                        <span v-if="errors.member_type" class="text-danger mt-2 font-size-13">{{
                            errors.member_type
                        }}</span>
                    </div>

                    <div class="col-md-3 mb-16">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault1"
                                v-model="item.status" />
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
import CKEditor from 'ckeditor4-vue';
import UploadedImg from "@/components/Utility/UploadedImg.vue";
import MediasMixin from "@/mixins/MediasMixin.vue";

export default {
    name: "MemberModal",
    mixins: [CreateMixin, UploadPreviewMixin, MediasMixin],
    components: { ErrorSpan, ckeditor: CKEditor.component, UploadedImg },
    data() {
        return {
            url: 'member',
            types: [
                { id: 'bod', type: 'BOD' },
                { id: 'management-team', type: 'Management Team' }
            ],
            fetch_module: 'FETCH_MEMBERS'
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
            this.errors = {};
            this.isEdit = true;
            this.item = { ...data };
            this.clearselectedFiles();
            this.mode = "Edit";
        });

    },
};
</script>


