<template>
  <flex-layout>
    <Details />
    <page-header heading="Master Configuration" action="Create Button" :guard="this.$route.meta.guard" />
    <div class="px-24 pt-24">
      <form class="row align-end">
        <div class="col-md-2 mb-3">
          <label for="">Date From</label>
          <select name="" id="" class="form-select">
            <option value="1">Select..</option>
            <option value="2">Opation A</option>
            <option value="3">Option B</option>
          </select>
        </div>
        <div class="col-md-4 mb-3">
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
        <div class="col-md-4 mb-3">
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
      </form>
    </div>
    <div class="position-relative p-24 flex-grow-1">
      <ag-grid-vue
        style="height: 100%"
        class="ag-theme-alpine"
        :columnDefs="columnDefs"
        :rowData="rowData"
        @grid-ready="onGridReady"
        @column-resized="onColumnResized"
        :pagination="true"
        :paginationAutoPageSize="true"
        @first-data-rendered="onFirstDataRendered"
      >
      </ag-grid-vue>
    </div>
  </flex-layout>
</template>

<script>
  import FlexLayout from "../../components/Layout/FlexLayout.vue";
  import Details from "../../components/Offcanvas/Details.vue";
  // import DefaultTable from "../../components/Table/DefaultTable.vue";
  import PageHeader from "../../components/Utility/PageHeader.vue";
  import Multiselect from "vue-multiselect";
  import "ag-grid-community/dist/styles/ag-grid.css";
  import "ag-grid-community/dist/styles/ag-theme-alpine.css";
  import { AgGridVue } from "ag-grid-vue";

  export default {
    name: "Master Configuration",
    components: {
      PageHeader,
      FlexLayout,
      Details,
      // DefaultTable,
      Multiselect,
      AgGridVue,
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
        gridApi: null,
        columnApi: null,
        defaultColDef: {
          resizable: true,
        },
      };
    },

    beforeMount() {
      this.columnDefs = [
        {
          field: "SN",
          width: "64px",
          filter: "agSetColumnFilter",
          filterParams: { applyMiniFilterWhileTyping: true },
        },
        {
          field: "FirstName",
          width: "180px",
          filter: "agSetColumnFilter",
          filterParams: { applyMiniFilterWhileTyping: true },
        },
        {
          field: "LastName",
          width: "320px",
          filter: "agSetColumnFilter",
          filterParams: { applyMiniFilterWhileTyping: true },
        },
        {
          field: "Email",
          width: "320px",
          filter: "agSetColumnFilter",
          filterParams: { applyMiniFilterWhileTyping: true },
        },
        {
          field: "Gender",
          width: "320px",
          filter: "agSetColumnFilter",
          filterParams: { applyMiniFilterWhileTyping: true },
        },
        {
          field: "Country",
          width: "320px",
          filter: "agSetColumnFilter",
          filterParams: { applyMiniFilterWhileTyping: true },
        },
      ];

      this.rowData = [
        {
          SN: 1,
          FirstName: "Oran",
          LastName: "Edworthye",
          Email: "oedworthye0@aboutads.info",
          Gender: "Male",
          Country: "Canada",
        },
        {
          SN: 2,
          FirstName: "Christean",
          LastName: "Portman",
          Email: "cportman1@sun.com",
          Gender: "Genderqueer",
          Country: "Egypt",
        },
        {
          SN: 3,
          FirstName: "Lusa",
          LastName: "Hollow",
          Email: "lhollow2@hao123.com",
          Gender: "Female",
          Country: "Ukraine",
        },
        {
          SN: 4,
          FirstName: "Karrie",
          LastName: "Walsh",
          Email: "kwalsh3@bloomberg.com",
          Gender: "Female",
          Country: "Argentina",
        },
        {
          SN: 5,
          FirstName: "Barr",
          LastName: "Perutto",
          Email: "bperutto4@disqus.com",
          Gender: "Male",
          Country: "China",
        },
        {
          SN: 6,
          FirstName: "Lettie",
          LastName: "Purselow",
          Email: "lpurselow5@umn.edu",
          Gender: "Female",
          Country: "Thailand",
        },
        {
          SN: 7,
          FirstName: "Rickie",
          LastName: "Tyer",
          Email: "rtyer6@google.it",
          Gender: "Male",
          Country: "Russia",
        },
        {
          SN: 8,
          FirstName: "Melisenda",
          LastName: "Harradence",
          Email: "mharradence7@cocolog-nifty.com",
          Gender: "Female",
          Country: "Mongolia",
        },
        {
          SN: 9,
          FirstName: "Lanna",
          LastName: "Daintith",
          Email: "ldaintith8@house.gov",
          Gender: "Female",
          Country: "Russia",
        },
        {
          SN: 10,
          FirstName: "Harley",
          LastName: "Bukowski",
          Email: "hbukowski9@google.fr",
          Gender: "Male",
          Country: "Philippines",
        },
        {
          SN: 11,
          FirstName: "Silvan",
          LastName: "Navaro",
          Email: "snavaroa@reference.com",
          Gender: "Male",
          Country: "Ethiopia",
        },
        {
          SN: 12,
          FirstName: "Neale",
          LastName: "Barthelemy",
          Email: "nbarthelemyb@soundcloud.com",
          Gender: "Male",
          Country: "Kyrgyzstan",
        },
        {
          SN: 13,
          FirstName: "Mead",
          LastName: "Connow",
          Email: "mconnowc@yale.edu",
          Gender: "Male",
          Country: "Indonesia",
        },
        {
          SN: 14,
          FirstName: "Jeralee",
          LastName: "De Laci",
          Email: "jdelacid@imdb.com",
          Gender: "Female",
          Country: "China",
        },
        {
          SN: 15,
          FirstName: "Daffie",
          LastName: "Scrauniage",
          Email: "dscrauniagee@google.com.br",
          Gender: "Female",
          Country: "Portugal",
        },
        {
          SN: 16,
          FirstName: "Grantham",
          LastName: "Portis",
          Email: "gportisf@taobao.com",
          Gender: "Male",
          Country: "Greece",
        },
        {
          SN: 17,
          FirstName: "Paulina",
          LastName: "O'Lochan",
          Email: "polochang@vimeo.com",
          Gender: "Female",
          Country: "Philippines",
        },
        {
          SN: 18,
          FirstName: "Christyna",
          LastName: "McCurlye",
          Email: "cmccurlyeh@weather.com",
          Gender: "Female",
          Country: "Japan",
        },
        {
          SN: 19,
          FirstName: "Mozelle",
          LastName: "MacGowing",
          Email: "mmacgowingi@huffingtonpost.com",
          Gender: "Female",
          Country: "Philippines",
        },
        {
          SN: 20,
          FirstName: "Jonathan",
          LastName: "Brocklebank",
          Email: "jbrocklebankj@wikispaces.com",
          Gender: "Male",
          Country: "China",
        },
        {
          SN: 21,
          FirstName: "Erena",
          LastName: "Noel",
          Email: "enoelk@angelfire.com",
          Gender: "Female",
          Country: "Vietnam",
        },
        {
          SN: 22,
          FirstName: "Carling",
          LastName: "Larham",
          Email: "clarhaml@posterous.com",
          Gender: "Male",
          Country: "Afghanistan",
        },
        {
          SN: 23,
          FirstName: "Chadwick",
          LastName: "Crudginton",
          Email: "ccrudgintonm@ezinearticles.com",
          Gender: "Male",
          Country: "China",
        },
        {
          SN: 24,
          FirstName: "Jilleen",
          LastName: "Daveran",
          Email: "jdaverann@timesonline.co.uk",
          Gender: "Female",
          Country: "Indonesia",
        },
        {
          SN: 25,
          FirstName: "Guenna",
          LastName: "Puve",
          Email: "gpuveo@springer.com",
          Gender: "Female",
          Country: "Colombia",
        },
        {
          SN: 26,
          FirstName: "Chuck",
          LastName: "Berntssen",
          Email: "cberntssenp@pbs.org",
          Gender: "Male",
          Country: "United States",
        },
        {
          SN: 27,
          FirstName: "Tiphani",
          LastName: "Jollie",
          Email: "tjollieq@admin.ch",
          Gender: "Female",
          Country: "Sweden",
        },
        {
          SN: 28,
          FirstName: "Iain",
          LastName: "Defraine",
          Email: "idefrainer@mysql.com",
          Gender: "Male",
          Country: "Czech Republic",
        },
        {
          SN: 29,
          FirstName: "Ross",
          LastName: "Dolle",
          Email: "rdolles@cbsnews.com",
          Gender: "Genderqueer",
          Country: "Sweden",
        },
        {
          SN: 30,
          FirstName: "Claudie",
          LastName: "Paolazzi",
          Email: "cpaolazzit@economist.com",
          Gender: "Female",
          Country: "China",
        },
        {
          SN: 31,
          FirstName: "Hastings",
          LastName: "Blondelle",
          Email: "hblondelleu@sciencedirect.com",
          Gender: "Male",
          Country: "Ukraine",
        },
        {
          SN: 32,
          FirstName: "Gav",
          LastName: "Holdren",
          Email: "gholdrenv@time.com",
          Gender: "Male",
          Country: "Philippines",
        },
        {
          SN: 33,
          FirstName: "Zuzana",
          LastName: "Cockton",
          Email: "zcocktonw@wisc.edu",
          Gender: "Agender",
          Country: "Poland",
        },
        {
          SN: 34,
          FirstName: "Jennee",
          LastName: "Pavia",
          Email: "jpaviax@washington.edu",
          Gender: "Female",
          Country: "Poland",
        },
        {
          SN: 35,
          FirstName: "Merrill",
          LastName: "Moss",
          Email: "mmossy@google.es",
          Gender: "Male",
          Country: "China",
        },
        {
          SN: 36,
          FirstName: "Kathryne",
          LastName: "Bentley",
          Email: "kbentleyz@yelp.com",
          Gender: "Agender",
          Country: "Poland",
        },
        {
          SN: 37,
          FirstName: "Derron",
          LastName: "Stoner",
          Email: "dstoner10@spotify.com",
          Gender: "Agender",
          Country: "Guatemala",
        },
        {
          SN: 38,
          FirstName: "Ellyn",
          LastName: "Behrend",
          Email: "ebehrend11@cnet.com",
          Gender: "Female",
          Country: "Poland",
        },
        {
          SN: 39,
          FirstName: "Anselm",
          LastName: "Willcox",
          Email: "awillcox12@networksolutions.com",
          Gender: "Male",
          Country: "Indonesia",
        },
        {
          SN: 40,
          FirstName: "Fionna",
          LastName: "Sparey",
          Email: "fsparey13@ning.com",
          Gender: "Female",
          Country: "Indonesia",
        },
        {
          SN: 41,
          FirstName: "Shae",
          LastName: "Hoff",
          Email: "shoff14@usgs.gov",
          Gender: "Male",
          Country: "Brazil",
        },
        {
          SN: 42,
          FirstName: "Claire",
          LastName: "Pike",
          Email: "cpike15@reverbnation.com",
          Gender: "Male",
          Country: "Indonesia",
        },
        {
          SN: 43,
          FirstName: "Filberto",
          LastName: "Wickham",
          Email: "fwickham16@hp.com",
          Gender: "Male",
          Country: "Russia",
        },
        {
          SN: 44,
          FirstName: "Milt",
          LastName: "Bratcher",
          Email: "mbratcher17@prnewswire.com",
          Gender: "Male",
          Country: "Philippines",
        },
        {
          SN: 45,
          FirstName: "Karlyn",
          LastName: "Hoxey",
          Email: "khoxey18@washingtonpost.com",
          Gender: "Female",
          Country: "United States",
        },
        {
          SN: 46,
          FirstName: "Judd",
          LastName: "Statton",
          Email: "jstatton19@people.com.cn",
          Gender: "Male",
          Country: "Kazakhstan",
        },
        {
          SN: 47,
          FirstName: "Rollins",
          LastName: "Outlaw",
          Email: "routlaw1a@mit.edu",
          Gender: "Male",
          Country: "Belarus",
        },
        {
          SN: 48,
          FirstName: "Vanny",
          LastName: "Bowra",
          Email: "vbowra1b@naver.com",
          Gender: "Female",
          Country: "Russia",
        },
        {
          SN: 49,
          FirstName: "Jacquelin",
          LastName: "Kewzick",
          Email: "jkewzick1c@hc360.com",
          Gender: "Female",
          Country: "Palestinian Territory",
        },
        {
          SN: 50,
          FirstName: "Eberhard",
          LastName: "Buzin",
          Email: "ebuzin1d@wsj.com",
          Gender: "Male",
          Country: "Canada",
        },
      ];
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
      onColumnResized(params) {
        console.log(params);
      },
      sizeToFit() {
        console.log("heelllo");
        this.gridApi.sizeColumnsToFit();
      },
      onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
      },

      autoSizeAll(skipHeader) {
        const allColumnIds = [];
        this.gridColumnApi.getAllColumns().forEach((column) => {
          allColumnIds.push(column.getId());
        });
        this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
      },
      onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
      },
    },

    created() {
      this.sizeToFit();
    },
  };
</script>

<style scoped>
  .ag-header-cell-label .ag-header-cell-text {
    /* Force the width corresponding at how much width
    we need once the text is laid out vertically */
    width: 30px;
    transform: rotate(90deg);
    margin-top: 50px;
    /* Since we are rotating a span */
    display: inline-block;
  }
</style>
