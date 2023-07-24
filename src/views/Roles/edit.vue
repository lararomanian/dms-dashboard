<template>
    <flex-layout>
      <Details />
      <page-header heading="Roles Edit" action="Create Button" />
    
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
    import "ag-grid-community/dist/styles/ag-grid.css";
    import "ag-grid-community/dist/styles/ag-theme-alpine.css";
    import { AgGridVue } from "ag-grid-vue";
  
    export default {
      name: "Edit Roles",
      components: {
        PageHeader,
        FlexLayout,
        Details,
        // DefaultTable,
        AgGridVue,
      },
      data() {
        return {
          
          url : "roles-edit",
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
            field: "name",
            width: "180px",
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
            field: "Role",
            width: "320px",
            filter: "agSetColumnFilter",
            filterParams: { applyMiniFilterWhileTyping: true },
          },
          {
            field: "Action",
            width: "320px",
            filter: "agSetColumnFilter",
            filterParams: { applyMiniFilterWhileTyping: true },
          },
        ];
  
        this.rowData = [
          {
            SN: 1,
            name: "Oran",
            Email: "oedworthye0@aboutads.info",
            Role: "Male",
            Action: "Canada",
          },
          {
            SN: 2,
            name: "Christean",
            Email: "cportman1@sun.com",
            Role: "Rolequeer",
            Action: "Egypt",
          },
          {
            SN: 3,
            name: "Lusa",
            Email: "lhollow2@hao123.com",
            Role: "Female",
            Action: "Ukraine",
          },
          {
            SN: 4,
            name: "Karrie",
            Email: "kwalsh3@bloomberg.com",
            Role: "Female",
            Action: "Argentina",
          },
          {
            SN: 5,
            name: "Barr",
            Email: "bperutto4@disqus.com",
            Role: "Male",
            Action: "China",
          },
          {
            SN: 6,
            name: "Lettie",
            Email: "lpurselow5@umn.edu",
            Role: "Female",
            Action: "Thailand",
          },
          {
            SN: 7,
            name: "Rickie",
            Email: "rtyer6@google.it",
            Role: "Male",
            Action: "Russia",
          },
          {
            SN: 8,
            name: "Rickie",
            Email: "rtyer6@google.it",
            Role: "Male",
            Action: "Russia",
          },
          {
            SN: 9,
            name: "Rickie",
            Email: "rtyer6@google.it",
            Role: "Male",
            Action: "Russia",
          },
          {
            SN: 10,
            name: "Rickie",
            Email: "rtyer6@google.it",
            Role: "Male",
            Action: "Russia",
          },
          {
            SN: 11,
            name: "Rickie",
            Email: "rtyer6@google.it",
            Role: "Male",
            Action: "Russia",
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
  