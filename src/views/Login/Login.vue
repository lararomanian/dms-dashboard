<template>
  <div class="login app-absolute-layout">
    <div class="container-fluid app-height">
      <div class="app-flex-layout flex-center-center">
        <div class="login-card d-flex">
          <div class="login-greeting w-50">
            <div class="logo img"><img :src="logo" alt="" style="width : 50%; height: 50%;"/></div>
            <div class="border-bottom border-blue400 my-24"></div>
            <h3 class="text-welcome fw-bold mb-12">Welcome to DMS ( Document Management System )</h3>
            <p>Manage your service requests by logging into the admin portal</p>
          </div>
          <div class="login-form w-50">
            <h3 class=" text-welcome mb-24">Sign In</h3>
            <form action="">
              <div class="mb-16">
                <label htmlfor="">Email Address</label><input class="form-control" v-model="user.email" />
              </div>
              <div class="mb-16">
                <label htmlfor="">Password</label>
                <div class="form-icon trail">
                  <input class="form-control" v-if="showPassword" type="text" v-model="user.password" />
                  <input class="form-control" v-else type="password" v-model="user.password" />
                  <i :class="{ 'ic-view': showPassword, 'ic-hidden': !showPassword }" @click="togglePassword"></i>
                </div>
              </div>

              <a class="btn btn-welcome btn-block mt-24" href="#" @click="login">Sign in</a>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logo from "D:/laragon/www/backend-dms/src/assets/img/pdf.png";
// import Auth from "../../plugins/Auth.js"

export default {
  name: "Login",
  components: {},
  data() {
    return {
      logo,
      showPassword: false,
      user: {
        email: '',
        password: '',
      }
    };
  },
  methods: {
    login() {
      let uri = process.env.VUE_APP_API_URL + 'login';
      this.axios.post(uri, this.user)
        .then(({ data }) => {
          console.log(data);
          // Auth.login(data.access_token,data.user);
          this.$store.dispatch('setUser', data.data);
          this.$store.dispatch('setToken', data.data.token);
          this.$router.push('/');

          this.$toast.success("Logged In Successfully.", {
            position: "bottom-right",
          });
        })
        .catch((error) => {
          // this.$toast.error(error.response.data.message, {
          //   position: "bottom-right",
          // });
          console.log(error)
        });
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
  }
};
</script>


<style lang="css" scoped>
.text-welcome {
  color: #29656f;
}

.btn-welcome {
  background: linear-gradient(90deg, #29656f, #35386b);
  color: white;
}
</style>