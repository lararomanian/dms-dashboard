<template>
  <flex-layout styleClasses="p-24">
    <div class="d-flex mb-16">
      <div class="dropdown dropdown-01">
        <button
          class="btn btn-outline-primary btn-icon"
          id="dropdownMenuButton1"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="ic-sort mr-4"></i>Sort
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <p class="font-semibold mb-8 text-black">Sort By</p>
          <li>Alphabetically A-Z</li>
          <li>Newest to Oldest</li>
          <li>Oldest to Newest</li>
        </ul>
      </div>
      <div class="form-icon trail mx-16 flex-grow-1">
        <input class="form-control" placeholder="Search" /><i
          class="ic-search"
        ></i>
      </div>
      <div class="dropdown dropdown-01 filter">
        <button
          class="btn btn-primary btn-icon"
          id="dropdownMenuButton1"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="ic-filter"></i>
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <p class="font-semibold mb-8 text-black">Filter By</p>
          <form action="">
            <div class="mb-12">
              <label for="" class="small">Date From</label>
              <input type="date" class="form-control form-control-sm" />
            </div>
            <div class="mb-16">
              <label for="" class="small">Date From</label>
              <input type="date" class="form-control form-control-sm" />
            </div>
          </form>
          <div class="d-flex">
            <div class="btn btn-sm btn-outline-red btn-block mr-16">Cancel</div>
            <div class="btn btn-sm btn-primary btn-block">Filter</div>
          </div>
        </ul>
      </div>
    </div>
    <div class="position-relative h-100">
      <absolute-layout :scrollable="true" styleClass="table-responsive">
        <table class="table table-01">
          <thead>
            <th v-for="item in tableHeading" :key="item.index">
              {{ item.heading }}
            </th>

            <th>Actions</th>
          </thead>
          <tbody>
            <tr v-for="item in tableData" :key="item.index">
              <td>{{ item.appliedDate }}</td>
              <td>{{ item.fullName }}</td>
              <td>{{ item.department }}</td>
              <td>{{ item.email }}</td>
              <td class="text-center">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                </div>
              </td>
              <!-- <td>{{ item.assigned }}</td> -->
              <td>
                <div
                  v-if="item.status == 'Offline'"
                  class="badge bg-red rounded-pill"
                >
                  {{ item.status }}
                </div>
                <div
                  v-else-if="item.status == 'Online'"
                  class="badge bg-green rounded-pill"
                >
                  {{ item.status }}
                </div>
                <div v-else class="badge bg-yellow rounded-pill">
                  {{ item.status }}
                </div>
              </td>
              <td class="action">
                <button
                  title="view"
                  class="btn btn-sm btn-gray"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight"
                >
                  <i class="ic-view"></i>
                </button>
                <button
                  title="Edit"
                  class="btn btn-sm btn-gray"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight"
                >
                  <i class="ic-edit"></i>
                </button>
                <button
                  title="Delete"
                  class="btn btn-sm btn-gray"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight"
                >
                  <i class="ic-delete"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="table-footer">
          <div class="align-center">
            <p>View</p>
            <select class="form-select-custom">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
            <p>per page</p>
          </div>
          <nav class="align-center">
            <p class="mr-8">1-10 out of 200</p>
            <ul class="pagination pagination-sm">
              <li class="page-item">
                <a class="page-link" href="#"
                  ><i class="ic-chevron-left"></i
                ></a>
              </li>

              <li class="page-item active">
                <a class="page-link" href="#">1</a>
              </li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item">
                <a class="page-link" href="#">....</a>
              </li>
              <li class="page-item"><a class="page-link" href="#">99</a></li>
              <li class="page-item">
                <a class="page-link" href="#"
                  ><i class="ic-chevron-right"></i
                ></a>
              </li>
            </ul>
          </nav>
        </div>
      </absolute-layout>
    </div>
  </flex-layout>
</template>

<script>
  import AbsoluteLayout from "../Layout/AbsoluteLayout.vue";
  import FlexLayout from "../Layout/FlexLayout.vue";
  export default {
    name: "Filter",
    components: { AbsoluteLayout, FlexLayout },

    data() {
      return {};
    },
    props: ["tableHeading", "tableData"],
  };
</script>
