<template>
  <v-layout>
    <v-flex md6>
      <h5 class="headline">Password Reset Request</h5>
      <p>Enter your email and we'll send you a link where you can reset your password.</p>
      <form @submit.prevent="submit">
        <v-text-field
          :error-messages="errors.collect('e-mail')"
          label="E-mail"
          name="e-mail"
          v-model="creds.email"
          v-validate="'required|email'"
        />
        <br>
        <v-btn type="submit">submit</v-btn>
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
      sendPasswordResetLink: "user/sendPasswordResetLink"
    }),
    async submit() {
      this.clearAlerts("VALIDATION_ERROR");
      this.clearAlerts("INFO");
      if (await this.$validator.validateAll()) {
        this.sendPasswordResetLink(this.creds)
          .then(({ data }) => {
            this.creds = {};
            this.$nuxt.$emit("ADD_ALERT", {
              id: "INFO",
              items: "Go to your email and follow the link we sent.",
              type: "info"
            });
            toastr.success(data.message);
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
