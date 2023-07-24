<template>
  <div class="login-right">
    <div class="row h-100">
      <div class="col-9 mx-auto">
        <div class="align-vertical h-100">
          <div class="w-100">
            <h4 class="fw-bold text-primary mb-3">Login</h4>

            <div class="alert-strip danger mb-3">
              <i class="ic-alert me-2"></i>Your username or password does not match
            </div>
            <form action="">
              <div class="form-group">
                <label for="">Email Address</label>
                <input type="text" class="form-control" />
              </div>
              <div class="form-group">
                <label for="">Password</label>
                <div class="form-control-icon rft">
                  <input type="password" class="form-control" />
                  <i class="ic-view" role="button"></i>
                </div>
              </div>
              <div class="align-between">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />
                  <label class="form-check-label" for="flexCheckChecked">
                    Keep me logged in
                  </label>
                </div>
                <a href="" class="text-primary p">Forgot Password?</a>
              </div>
              <button class="btn btn-primary w-100 mt-3">Login</button>
              <p class="small text-01 text-center mt-5">
                By signing up, I agree to
                <a href="" class="text-underline"> Terms of Service </a>
                and acknowledge that
                <a href="" class="text-underline"> Privacy Policy</a>
                applies to me.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginLeft",
};
</script>