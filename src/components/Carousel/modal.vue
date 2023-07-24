<template>
    <div class="offcanvas offcanvas-end offcanvas-01" id="offcanvasCreate" tabindex="-1"
        aria-labelledby="offcanvasCreateLabel">
        <div class="offcanvas-header">
            <h5 class="text-dark" id="offcanvasCreateLabel">{{ mode }} Carousel</h5>
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

                    <div class="col-md-12 mb-16">
                        <label for="">Description</label>
                        <textarea name="description" class="form-control" v-model="item.description"></textarea>
                        <ErrorSpan :error="errors.description" />
                    </div>

                    <div class="col-md-12 mb-16">
                        <label for="">Links</label>
                        <div class="row p-4" v-for="(n, index) in item.links" v-bind:key="index">
                            <div class="col-md-6">
                                <input type="text" class="form-control" placeholder="Title"
                                    v-model="item.links[index].title">
                            </div>
                            <div class="col-md-4">
                                <input type="text" class="form-control" placeholder="Link"
                                    v-model="item.links[index].link">
                            </div>
                        </div>
                    </div>
                    <div class="row mb-16">
                        <div class="col-md-6 ">
                            <label for="">Image</label>
                            <input type="file" class="form-control" ref="image" @input="handleImageUpload" />
                            <ErrorSpan :error="errors.image" />
                        </div>
                        <div class="col-md-6 mt-16" v-if="upload.status == false">
                            <a v-if="item.image" :href="storage + item.image" target="_blank">
                                <img :src="storage + item.image" alt="" height="50" width="50">
                            </a>
                        </div>
                        <div class="col-md-6 mt-16" v-else>
                            <img :src="upload.imgPreview" alt="" height="100" width="100">
                        </div>
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
import MediasMixin from "@/mixins/MediasMixin.vue";
import ErrorSpan from "@/components/errorspan.vue";

export default {
    name: "CarouselModal",
    mixins: [CreateMixin, UploadPreviewMixin, MediasMixin],
    components: { ErrorSpan },
    data() {
        return {
            url: 'carousel',
            mode: "",
            fetch_module: 'FETCH_CAROUSELS',
            item_struct: {
                id: "",
                title: "",
                subtitle: "",
                description: "",
                links: [
                    {
                        title: "",
                        link: ""
                    }
                ],
                image: "",
                order_by: 1,
                status: true
            },
        };
    },
    computed: {

    },
    mounted() {
        this.$root.$on('CREATE', () => {
            this.isEdit = false;
            Object.assign(this.item, this.item_struct);
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
    methods: {
        submitForm() {
            let formData = new FormData();
            for (let key in this.item) {
                if (key != 'links') {
                    formData.append(key, this.item[key]);
                }
            }
            formData.append('links', JSON.stringify(this.item.links));
            if (this.isEdit == false) {
                formData.delete('id');
            }
            let uri = this.api_url + this.url + (this.isEdit ? '/update' : '/store');
            this.isLoading = true;
            this.axios.post(uri, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            ).then((response) => {
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
