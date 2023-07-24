<template>
  <div class="offcanvas offcanvas-end offcanvas-01" id="offcanvasCreate" tabindex="-1"
    aria-labelledby="offcanvasCreateLabel">
    <div class="offcanvas-header">
      <h5 class="text-dark" id="offcanvasCreateLabel">{{ mode }} Menu</h5>
      <button class="btn btn-danger btn-sm" type="button" data-bs-dismiss="offcanvas" aria-label="Close" ref="btnClose">
        <i class="ic-close"></i>
      </button>
    </div>
    <div class="offcanvas-body">
      <div class="row">
        <form class="row align-end" v-on:submit.prevent="submitForm" enctype="multipart/form-data">
          <div class="col-md-6 mb-16">
            <label for="">Parent</label>
            <select name="parent_id" class="form-select" v-model="item.parent_id">
              <option value="" selected>Select Parent</option>
              <option v-for="item in parents" :key="item.id" :value="item.id">{{ item.title }}</option>
            </select>
            <ErrorSpan :error="errors.parent_id" />
          </div>
          <div class="col-md-6 mb-16">
            <label for="">Name</label>
            <input type="text" class="form-control" v-model="item.title" />
            <ErrorSpan :error="errors.title" />
          </div>
          
          <div class="col-md-6 mb-16">
            <label for="">Icon</label>
            <input type="text" class="form-control" v-model="item.icon" />
            <ErrorSpan :error="errors.icon" />
          </div>


          <div class="col-md-6 mb-16">
            <label for="">Link Type</label>
            <select name="parent_id" class="form-select" v-model="item.link_type">
              <option value="" disabled selected>Select Parent</option>
              <option v-for="item, key in link_types" :key="key" :value="key">{{ item }}</option>
            </select>
            <ErrorSpan :error="errors.link_type" />
          </div>
          <div class="col-md-6 mb-16" v-if="item.link_type_id == 3">
            <label for="">Page</label>
            <input type="text" class="form-control" v-model="item.page_id" />
            <ErrorSpan :error="errors.page_id" />
          </div>
          <div class="col-md-6 mb-16" v-else>
            <label for="">Link</label>
            <input type="text" class="form-control" v-model="item.link" />
            <ErrorSpan :error="errors.link" />
          </div>
          <div class="col-md-6 mb-16">
            <label for="">Menu Type</label>
            <select name="parent_id" class="form-select" v-model="item.menu_type">
              <option value="" disabled selected>Select Parent</option>
              <option v-for="item, key in menu_types" :key="key" :value="key">{{ item }}</option>
            </select>
            <ErrorSpan :error="errors.menu_type" />
          </div>
          <div class="col-md-6 mb-16">
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" v-model="item.status" />
              <label class="form-check-label" for="flexSwitchCheckDefault">Status</label>
              <ErrorSpan :error="errors.status" />
            </div>
          </div>
          <div class="col-md-6 mb-16">
                        <label for="">Display Order</label>
                        <input type="number" min="1" @input="item.order_by = item.order_by < 1 ? '' : item.order_by"
                            class="form-control" :class="{ 'border-red': errors.order_by }" v-model="item.order_by" />
                        <ErrorSpan :error="errors.order_by" />
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
import CreateMixin from "../../mixins/create.vue";
import UploadPreviewMixin from "@/mixins/uploadpreview.vue";
import ErrorSpan from "@/components/errorspan.vue";

export default {
  name: "MenuModal",
  components: {
    ErrorSpan
  },
  mixins: [CreateMixin, UploadPreviewMixin],

  data() {
    return {
      url: 'menu',
      fetch_module: 'FETCH_MENUs',
      link_types:{
        1: 'Internal',
        2: 'External',
      },

      menu_types:{
        "top-menu": "Top Menu",
        "header-menu": "Header Menu",
        "footer-menu": "Footer Menu",
        "floater-menu": "Floater Menu"
      },
    };
  },
  props: ['parents'],
  created() {
    console.log(this.menu_types);
    // this.$store.dispatch("fetchParents");

    this.$root.$on('CREATE', () => {
      this.isEdit = false;
      this.item = {
        status: false,
      };
      this.errors = {};
      this.mode = "Add";


    });

    this.$root.$on('EDIT', (data) => {

      this.mode = "Edit";
      this.isEdit = true;
      this.errors = {};
      let uri = process.env.VUE_APP_API_URL + 'menu/edit/' + data.id;
      this.axios.get(uri).then((response) => {
        this.item = response.data;
      }).catch((error) => {
        console.log(error);
      });
    });
  },
  methods: {
    closeForm() {
      this.$refs.btnClose.click();
    },
  },
};
</script>