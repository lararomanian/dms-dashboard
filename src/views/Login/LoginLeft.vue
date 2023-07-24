<template>
  <div class="login-left">
    <flex-layout>
      <div class="login-header">
        <a href="">© 2021 GICMS.</a>
        <a href="">All rights reserved.</a>
        <div>
          <i class="ic-globe align-middle text-white me-2"></i>
          <select>
            <option value="EN">EN</option>
            <option value="NP">NP</option>
          </select>
        </div>
      </div>
      <div class="align-vertical flex-grow-1">
        <div class="login-greeting">
          <div class="login-image me-4">
            <img :src="logo" alt="" />
          </div>
          <div>
            <h4 class="fw-bold mb-2">Welcome to GICMS</h4>
            <p>Manage your content by logging in to the admin portal.</p>
            <p class="mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id donec
              mollis habitant nascetur amet, rutrum neque suspendisse.
            </p>
          </div>
        </div>
      </div>
    </flex-layout>
  </div>
</template>

<script>
import FlexLayout from "../../components/Layout/FlexLayout.vue";
import loginLogo from "../../assets/img/gov-logo.png";

export default {
  name: "LoginLeft",
  components: {
    FlexLayout,
  },
  data() {
    return {
      logo: loginLogo,
    };
  },
};
</script>