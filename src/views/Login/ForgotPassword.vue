<template>
  <div class="login-right">
    <div class="row h-100">
      <div class="col-9 mx-auto">
        <div class="align-vertical  h-100">
          <div class="w-100">
            <h4 class="fw-bold text-primary ">Forgot Password?</h4>
            <p class="text-night-40 mb-3 mt-1">Enter your email here and we will send you a link to reset your password. </p>
            <form action="">
              <div class="form-group">
                <label for="">Email Address</label>
                <input type="text" class="form-control" />
              </div>
            
             
              <button class="btn btn-primary w-100">Submit</button>
               <p class="small text-01 text-center mt-5">
                Remember your password?
                <a href="" class="text-underline"> Login</a>
              </p>
              <p class="small text-01 text-center mt-4">
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
  name: "ForgotPassword",
};
</script>