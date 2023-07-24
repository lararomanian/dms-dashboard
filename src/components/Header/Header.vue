<template>
  <div class="header-01">
    <div class="modal fade modal-password" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-primary" id="exampleModalLabel">Change Password</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-16">
              <label htmlfor="">Old Password</label>
              <div class="form-icon trail">
                <input class="form-control" v-if="!showPassword.old" type="password"
                  v-model="change_password.old_password" />
                <input class="form-control" v-else type="text" v-model="change_password.old_password" />
                <i :class="{ 'ic-hidden': !showPassword.old, 'ic-view': showPassword.old }"
                  @click="togglePassword('old')"></i>
              </div>
            </div>
            <div class="mb-16">
              <label htmlfor="">New Password</label>
              <div class="form-icon trail">
                <input class="form-control" v-if="!showPassword.new" type="password"
                  v-model="change_password.new_password" />
                <input class="form-control" v-else type="text" v-model="change_password.new_password" />
                <i :class="{ 'ic-hidden': !showPassword.new, 'ic-view': showPassword.new }"
                  @click="togglePassword('new')"></i>
              </div>
            </div>
            <div class="mb-16">
              <label htmlfor="">Confirm NewPassword</label>
              <div class="form-icon trail">
                <input class="form-control" v-if="!showPassword.new_confirm" type="password"
                  v-model="change_password.new_password_confirmation" />
                <input class="form-control" v-else type="text" v-model="change_password.new_password_confirmation" />
                <i :class="{ 'ic-hidden': !showPassword.new_confirm, 'ic-view': showPassword.new_confirm }"
                  @click="togglePassword('new_confirm')"></i>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal" ref="closeModal">
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="changePassword()">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <div class="align-center">
      <i class="ic-menu mr-16" @click.prevent="toggleSidebar"></i>
      <h6>DMS</h6>
    </div>
    <div class="align-center">
      <div class="dropdown dropdown-01 notification">
        <a class="active" id="dropdownMenuButton1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="ic-notification"></i>
        </a>
        <ul class="dropdown-menu list-bullet" aria-labelledby="dropdownMenuButton1">
          <div class="flex-center-between">
            <p class="fw-semibold">Notification</p>
            <router-link to="/" class="small text-primary">View all</router-link>
          </div>
          <li>
            <router-link to="/" class="">
              <small class="clamp-3">
                Rajendra Shrestha has filed a complaint
              </small>
              <small class="text-cGray600 mt-2">10 secs ago</small>
            </router-link>
          </li>
          <li>
            <router-link to="/" class="">
              <small class="clamp-3">
                Rajendra Shrestha has filed a complaint
              </small>
              <small class="text-cGray600 mt-2">10 secs ago</small>
            </router-link>
          </li>
          <li>
            <router-link to="/" class="">
              <small class="clamp-3">
                Rajendra Shrestha has filed a complaint
              </small>
              <small class="text-cGray600 mt-2">10 secs ago</small>
            </router-link>
          </li>
          <li>
            <router-link to="/" class="">
              <small class="clamp-3">
                Rajendra Shrestha has filed a complaint
              </small>
              <small class="text-cGray600 mt-2">10 secs ago</small>
            </router-link>
          </li>
          <li>
            <router-link to="/" class="">
              <small class="clamp-3">
                Rajendra Shrestha has filed a complaint
              </small>
              <small class="text-cGray600 mt-2">10 secs ago</small>
            </router-link>
          </li>
          <li>
            <router-link to="/" class="">
              <small class="clamp-3">
                Rajendra Shrestha has filed a complaint
              </small>
              <small class="text-cGray600 mt-2">10 secs ago</small>
            </router-link>
          </li>
          <li>
            <router-link to="/" class="">
              <small class="clamp-3">
                Rajendra Shrestha has filed a complaint
              </small>
              <small class="text-cGray600 mt-2">10 secs ago</small>
            </router-link>
          </li>
          <li>
            <router-link to="/" class="">
              <small class="clamp-3">
                Rajendra Shrestha has filed a complaint
              </small>
              <small class="text-cGray600 mt-2">10 secs ago</small>
            </router-link>
          </li>
          <li>
            <router-link to="/" class="">
              <small class="clamp-3">
                Rajendra Shrestha has filed a complaint
              </small>
              <small class="text-cGray600 mt-2">10 secs ago</small>
            </router-link>
          </li>
          <li>
            <router-link to="/" class="">
              <small class="clamp-3">
                Rajendra Shrestha has filed a complaint
              </small>
              <small class="text-cGray600 mt-2">10 secs ago</small>
            </router-link>
          </li>
          <li>
            <router-link to="/" class="">
              <small class="clamp-3">
                Rajendra Shrestha has filed a complaint
              </small>
              <small class="text-cGray600 mt-2">10 secs ago</small>
            </router-link>
          </li>
          <li>
            <router-link to="/" class="">
              <small class="clamp-3">
                Rajendra Shrestha has filed a complaint
              </small>
              <small class="text-cGray600 mt-2">10 secs ago</small>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="dropdown dropdown-01">
        <a class="p fw-bold align-center" id="dropdownMenuButton1" type="button" data-bs-toggle="dropdown"
          aria-expanded="false">
          {{ user.name }} <i class="ic-chevron-bottom ml-8"></i>
        </a>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li data-bs-toggle="modal" data-bs-target="#exampleModal">
            Change Password
          </li>
          <li @click.prevent="logout">
            <a class="text-danger"> Logout </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import Auth from "../../plugins/Auth.js"

export default {
  name: "Header",
  data() {
    return {
      isToggled: false,
      showPassword: {
        old: false,
        new: false,
        new_confirm: false
      },
      change_password: {
        old_password: '',
        new_password: '',
        new_password_confirmation: ''
      },
    };
  },
  computed: {
    user() {
      return this.$store.getters.authUser;
    },
    isSelected() {
      return this.$store.state.isSelected;
    },
    isHovered() {
      return this.$store.state.isHovered;
    },
  },
  methods: {
    toggleSidebar() {
      this.isToggled = !this.isToggled;
      this.$emit("clicked", this.isToggled);
    },
    logout() {
      let uri = process.env.VUE_APP_API_URL + 'logout';
      this.axios.post(uri)
        .then(() => {
          this.$store.commit("LOG_OUT");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    togglePassword(elem) {
      this.showPassword[elem] = !this.showPassword[elem];
    },
    changePassword() {
      let uri = process.env.VUE_APP_API_URL + 'change-password';
      this.axios.post(uri, this.change_password)
        .then((response) => {
          this.$toast.success(response.data.message, {
            position: "bottom-right",
          });
          this.$refs.closeModal.click();
        })
        .catch((error) => {
        
            this.$toast.error(error.response.data.message, {
              position: "bottom-right",
            });
            console.log(error);
         
        });
    },
  },
};
</script>
