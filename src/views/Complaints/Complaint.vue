<template>
  <flex-layout>
    <Details />
    <page-header heading="Complaints" />
    <div class="px-24 pt-24">
      <form class="row align-end">
        <div class="col-md-4 mb-3">
          <label for="">Date From</label>
          <input type="date" class="form-control" />
        </div>
        <div class="col-md-4 mb-3">
          <label for="">Date From</label>
          <input type="date" class="form-control" />
        </div>
        <div class="col-md-4 mb-3">
          <button class="btn-primary btn mr-16">Filter</button>
          <button class="btn-outline-primary btn">Export</button>
        </div>
      </form>
    </div>
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
              <div class="btn btn-sm btn-outline-red btn-block mr-16">
                Cancel
              </div>
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
              <tr>
                <td colspan="7" class="text-center">
                  <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
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
  </flex-layout>
</template>

<script>
  // import AbsoluteLayout from "../../components/Layout/AbsoluteLayout.vue";
  import FlexLayout from "../../components/Layout/FlexLayout.vue";
  import Details from "../../components/Offcanvas/Details.vue";
  import PageHeader from "../../components/Utility/PageHeader.vue";
  export default {
    name: "Complaint",
    components: {
      // AbsoluteLayout,
      PageHeader,
      FlexLayout,
      Details,
    },
    data() {
      return {
        tableData: [
          {
            appliedDate: "10/13/2021",
            fullName: "Maddie Lindemann",
            department: "Marketing",
            email: "oivons0@t.co",
            phone: "942-780-9888",
            assigned: "Ozzie Ivons",
          },
          {
            appliedDate: "4/25/2022",
            fullName: "Laurie Cockrem",
            department: "Training",
            email: "hmcpherson1@booking.com",
            phone: "256-356-0918",
            assigned: "Holly McPherson",
          },
          {
            appliedDate: "10/12/2021",
            fullName: "Felita Mackison",
            department: "Human Resources",
            email: "aeldin2@reddit.com",
            phone: "227-409-7271",
            assigned: "Agnes Eldin",
          },
          {
            appliedDate: "9/14/2021",
            fullName: "Robin Goade",
            department: "Support",
            email: "gkenforth3@sun.com",
            phone: "290-694-0490",
            assigned: "Giffard Kenforth",
          },
          {
            appliedDate: "1/4/2022",
            fullName: "Steven Clink",
            department: "Accounting",
            email: "ltoler4@pinterest.com",
            phone: "419-142-5176",
            assigned: "Locke Toler",
          },
          {
            appliedDate: "1/18/2022",
            fullName: "Fraze Woodroofe",
            department: "Engineering",
            email: "ljulyan5@vkontakte.ru",
            phone: "937-959-9786",
            assigned: "Lib Julyan",
          },
          {
            appliedDate: "11/30/2021",
            fullName: "Fernande Lugg",
            department: "Product Management",
            email: "mfeltham6@google.cn",
            phone: "352-275-4954",
            assigned: "Markus Feltham",
          },
        ],
        tableHeading: [
          {
            heading: "Applied Date",
          },
          {
            heading: "Full Name",
          },
          {
            heading: "Department",
          },
          {
            heading: "Email Address",
          },
          {
            heading: "Phone No.",
          },
          {
            heading: "Assigned To",
          },
        ],
      };
    },
    methods: {},
  };
</script>
