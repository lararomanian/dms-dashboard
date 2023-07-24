<template>
  <flex-layout>
    <Details />
    <page-header heading="Master Configuration" :guard="this.$route.meta.guard"/>
    <div class="px-24 pt-24">
      <form class="row align-end">
        <div class="col-md-4 mb-16">
          <div class="multiselect-default multiple">
            <label class="typo__label">Tagging</label>
            <multiselect
              v-model="value"
              tag-placeholder="Add this as new tag"
              placeholder="Search or add a tag"
              label="name"
              track-by="code"
              :options="taggableOptions"
              :multiple="true"
              :taggable="true"
              @tag="addTag"
            ></multiselect>
          </div>
        </div>
        <div class="col-md-4 mb-16">
          <div class="multiselect-default">
            <label for="">Searchable Select</label>
            <multiselect
              v-model="value"
              :options="options"
              :custom-label="nameWithLang"
              placeholder="Select one"
              label="name"
              track-by="name"
            ></multiselect>
          </div>
        </div>
        <div class="col-md-4 mb-16">
          <div class="multiselect-default multiple">
            <label for="">Multiple Select</label>
            <multiselect
              v-model="multipleValue"
              tag-placeholder="Add this as new tag"
              placeholder="Search or add a tag"
              label="name"
              track-by="code"
              :options="multipleOptions"
              :multiple="true"
              :taggable="true"
              @tag="addTag"
            ></multiselect>
          </div>
        </div>
        <div class="col-md-4 mb-16">
          <label for="">Date From</label>
          <select name="" id="" class="form-select">
            <option value="1">Select..</option>
            <option value="2">Opation A</option>
            <option value="3">Option B</option>
          </select>
        </div>
        <div class="col-md-4 mb-16">
          <label for="">Text Field</label>
          <input type="text" class="form-control" />
        </div>
        <div class="col-md-4 mb-16">
          <label for="">Date</label>
          <input type="date" class="form-control" />
        </div>
        <div class="col-md-12 mb-16">
          <label for="">Textarea</label>
          <textarea
            class="form-control"
            placeholder="Good afternoon Madhu,You have been shortlisted for an interview for the position of Junior Python Developer. Following are the meeting details:"
          ></textarea>
        </div>
        <div class="col-md-4 mb-16">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label class="form-check-label" for="flexCheckDefault">
              Default checkbox
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              checked
              id="flexCheckDefault"
            />
            <label class="form-check-label" for="flexCheckDefault">
              Default checked checkbox
            </label>
          </div>
        </div>
        <div class="col-md-4 mb-16">
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
            />
            <label class="form-check-label" for="flexRadioDefault1">
              Default radio
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              checked
            />
            <label class="form-check-label" for="flexRadioDefault2">
              Default checked radio
            </label>
          </div>
        </div>
        <div class="col-md-4 mb-16">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
            />
            <label class="form-check-label" for="flexSwitchCheckDefault"
              >Default switch checkbox input</label
            >
          </div>
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              id="flexSwitchCheckChecked"
              checked
            />
            <label class="form-check-label" for="flexSwitchCheckChecked"
              >Checked switch checkbox input</label
            >
          </div>
        </div>
        <div class="col-md-6">
          <div class="align-center">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <button class="btn btn-primary ml-24" type="button" disabled>
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Loading...
            </button>
          </div>
        </div>
      </form>
    </div>
  </flex-layout>
</template>

<script>
  import FlexLayout from "../../components/Layout/FlexLayout.vue";
  import Details from "../../components/Offcanvas/Details.vue";
  import PageHeader from "../../components/Utility/PageHeader.vue";
  import Multiselect from "vue-multiselect";

  export default {
    name: "Master Configuration",
    components: {
      PageHeader,
      FlexLayout,
      Details,
      Multiselect,
    },
    data() {
      return {
        value: { name: "Vue.js", language: "JavaScript" },
        options: [
          { name: "Vue.js", language: "JavaScript" },
          { name: "Rails", language: "Ruby" },
          { name: "Sinatra", language: "Ruby" },
          { name: "Laravel", language: "PHP" },
          { name: "Phoenix", language: "Elixir" },
        ],
        multipleValue: [{ name: "Javascript", code: "js" }],
        multipleOptions: [
          { name: "Vue.js", code: "vu" },
          { name: "Javascript", code: "js" },
          { name: "Open Source", code: "os" },
          { name: "React.js", code: "re" },
          { name: "Angular", code: "ng" },
          { name: "Pug js Source", code: "pug" },
          { name: "SASS", code: "scss" },
        ],
        taggableOptions: [
          { name: "Vue.js", code: "vu" },
          { name: "Javascript", code: "js" },
          { name: "Svelte", code: "js" },
        ],
      };
    },

    methods: {
      nameWithLang({ name, language }) {
        return `${name} — [${language}]`;
      },
      addTag(newTag) {
        const tag = {
          name: newTag,
          code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
        };
        this.options.push(tag);
        this.value.push(tag);
      },
    },
  };
</script>
