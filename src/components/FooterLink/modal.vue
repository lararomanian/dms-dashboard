<template>
    <div class="offcanvas offcanvas-end offcanvas-01" id="offcanvasCreate" tabindex="-1"
        aria-labelledby="offcanvasCreateLabel">
        <div class="offcanvas-header">
            <h5 class="text-dark" id="offcanvasCreateLabel">{{ mode }} Footer Link</h5>
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
                        <label for="">Link</label>
                        <input type="text" class="form-control" v-model="item.link" />
                        <ErrorSpan :error="errors.link" />
                    </div>
                    <div class="col-md-12 mb-16">
                        <label for="">Type</label>
                        <select name="type" class="form-select" :class="{ 'border-red': errors.type }" v-model="item.type">
                            <option value="" disabled selected>Select Type</option>
                            <option v-for="(item, index) in types" :key="index" :value="item.slug">{{ item.type }}
                            </option>
                        </select>
                        <span v-if="errors.type" class="text-danger mt-2 font-size-13">{{ errors.type }}</span>
                    </div>

                    <!-- <div class=" row mb-16">
                        <div class="col-md-8 ">
                            <label for="">Icon</label>
                            <v-select :options="icons" label="icon" v-model="item.icon">
                                <template v-slot:option="icon">
                                    <i :class="icon.icon" />
                                </template>

                            </v-select>
                        </div>
                        <div class="col-md-4 mt-32">
                            <i :class="item.icon" />
                        </div>
                    </div> -->

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
import ErrorSpan from "@/components/errorspan.vue";
// import { iconlist } from "@/plugins/iconlist.js";

export default {
    name: "FooterLinkModal",
    mixins: [CreateMixin],
    components: { ErrorSpan },
    data() {
        return {
            url: 'footer-link',
            mode: "",
            types: [
                // { slug: "app", type: "App" },
                { slug: "facebook", type: "Facebook" },
                { slug: "twitter", type: "Twitter" },
                { slug: "instagram", type: "Instagram" },
                { slug: "whatsapp", type: "Whatsapp" },
                { slug: "quick-link", type: "Quick Link" },
                { slug: "bank", type: "Bank" },
                { slug: "important-link", type: "Important Link" },
            ],
            // icons: [],
            fetch_module:'FETCH_FOOTER_LINKS'
        };
    },
    mounted() {
        // this.icons = iconlist();
        this.$root.$on('CREATE', () => {
            this.isEdit = false;
            this.item = {
            };
            this.errors = {};
            this.mode = "Add";
        });

        this.$root.$on('EDIT', (data) => {
            this.errors = {};
            this.isEdit = true;
            this.item = { ...data };
            this.mode = "Edit";
        });
    },
    methods: {
        // selectIcon(event) {
        //     this.item.icon = event.icon;
        // }
    },
};
</script>
  
