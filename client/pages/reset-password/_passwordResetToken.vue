<template>
  <v-layout>
    <v-flex md6>
      <h5 class="headline">Reset Password</h5>
      <p>You may now change your password.</p>
      <form @submit.prevent="submit">
        <v-text-field
          :error-messages="errors.collect('password')"
          label="Password"
          name="password"
          type="password"
          v-model="creds.password"
          v-validate="'required'"
          ref="password"
        />
        <v-text-field
          :error-messages="errors.collect('confirm-password')"
          label="Confirm Password"
          name="confirm-password"
          type="password"
          v-model="creds.confirmPassword"
          v-validate="'required|confirmed:password'"
        />
        <br>
        <v-btn type="submit">Submit</v-btn>
      </form>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    creds: {}
  }),
  layout: "authentication",
  methods: {
    ...mapActions({
      resetPassword: "user/resetPassword"
    }),
    async submit() {
      this.clearAlerts("VALIDATION_ERROR");
      if (await this.$validator.validateAll()) {
        this.creds.passwordResetToken = this.$nuxt.$route.params.passwordResetToken;
        this.resetPassword(this.creds)
          .then(() => {
            toastr.success(`Password changed. You may now try to login.`);
            this.$router.push({ path: "/login" });
          })
          .catch(error =>
            this.handleError(error, "Password Reset Request Failed.")
          );
      }
    }
  }
};
</script>

<style>
</style>
