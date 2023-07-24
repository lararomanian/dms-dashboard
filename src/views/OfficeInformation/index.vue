<template>

    <flex-layout>
        <page-header heading="Office Information" :guard="this.$route.meta.guard" />
        <div class="col-md-12 p-48 ">

            <form class="row align-end" v-on:submit.prevent="submitForm" enctype="multipart/form-data">
                <div class="col-md-12 mb-16">
                    <label for="">Address</label>
                    <input type="text" class="form-control" v-model="item.address" />
                    <ErrorSpan :error="errors.address" />
                </div>

                <div class="col-md-12 mb-16">
                    <label for="">Contact</label>
                    <input type="text" class="form-control" v-model="item.contact" />
                    <ErrorSpan :error="errors.contact" />
                </div>

                <div class="col-md-12 mb-16">
                    <label for="">Email</label>
                    <input type="text" class="form-control" v-model="item.email" />
                    <ErrorSpan :error="errors.email" />
                </div>

                <div class="col-md-12 mb-16">
                    <label for="">Information Officer</label>
                    <select name="parent_id" class="form-select" v-model="item.member_id">
                        <option value="" selected>Select Parent</option>
                        <option v-for="item in members" :key="item.id" :value="item.id">{{ item.name }}</option>
                    </select>
                    <ErrorSpan :error="errors.member_id" />
                </div>

                <div class="col-md-12 mb-16">
                    <label for="">Office Timings</label>
                    <div class="row p-4" v-for="(n, index) in item.timings" v-bind:key="index">
                        <div class="col-md-6">
                            <input type="text" class="form-control" placeholder="Days"
                                v-model="item.timings[index].days">
                        </div>
                        <div class="col-md-4">
                            <input type="text" class="form-control" placeholder="Duration"
                                v-model="item.timings[index].duration">
                        </div>
                        <div class="col-md-2 d-flex justify-content-evenly">
                            <button class="btn btn-gray btn-large" type="button" @click="toggleTiming('Add')">+</button>
                            <button class="btn btn-gray btn-large" type="button" @click="toggleTiming('Sub')">-</button>
                        </div>
                    </div>
                </div>

                <hr>
                <div class="col-md-12">
                    <button v-if="!isLoading" class="btn btn-green float-end" type="submit" @click="submitForm">
                        <i class="ic-checkmark mr-8"></i>Save
                    </button>
                    <button v-else class="btn btn-green float-end" type="button" disabled>
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Loading...
                    </button>
                </div>
            </form>

        </div>




    </flex-layout>

</template>

<script>
import FlexLayout from "@/components/Layout/FlexLayout.vue";
import PageHeader from "@/components/Utility/PageHeader.vue";
import ErrorSpan from "@/components/errorspan.vue";

export default {
    name: "OfficeInformation",
    components: {
        PageHeader,
        FlexLayout,
        ErrorSpan,
    },
    data() {
        return {
            url: process.env.VUE_APP_API_URL + "office-information",
            isEdit: false,
            item: {
                id: "",
                address: "",
                contact: "",
                email: "",
                timings: [{
                    days: "",
                    duration: "",
                }],
                member_id: "",
            },

            errors: {},
            members: [],
            isLoading: false,
        };

    },
    mounted() {
        this.fetchMembers();
        this.fetchOfficeInformation();
    },
    methods: {
        toggleTiming(type) {
            if (type == 'Add') {
                this.item.timings.push({
                    days: "",
                    duration: "",
                });
            } else {
                if (this.item.timings.length > 1) {
                    this.item.timings.pop();
                }
            }
        },

        fetchOfficeInformation() {
            this.axios.get(this.url).then(({ data }) => {
                let struct = { ...this.item };
                if (data.length > 0) {
                    this.isEdit = true;
                    this.item = data[0];
                }
                else {
                    this.item = struct;
                }
                this.isLoading = false;
            });
        },

        fetchMembers() {
            this.axios.get(this.url + '/members').then(({ data }) => {
                this.members = data.data;
            });
        },

        submitForm() {
            this.errors = {};
            this.isLoading = true;
            if (!this.isEdit) {
                delete this.item.id;
            }
            let uri = this.url + (this.isEdit ? '/update' : '/store');
            this.axios.post(uri, this.item).then((response) => {
                this.isLoading = false;
                this.$toast.success(response.data.message, {
                    position: "bottom-right",
                });
                this.fetchOfficeInformation();
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
        pushErrors(errors) {
            Object.entries(errors).forEach((element) => {
                let [key, msg] = element;
                this.errors[key] = msg[0];
            });
        }

    },

};
</script>
