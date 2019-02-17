<template>
  <auth-form type="login" heading="Login" @submit="submit"/>
</template>

<script>
import Vue from "vue";
import ValidatorMixin from "~/mixins/Validator";
import AuthMixin from "~/mixins/Auth";
import AuthForm from "~/components/auth/AuthForm";
import { mapActions } from "vuex";

export default {
  mixins: [ValidatorMixin, AuthMixin],
  layout: "authentication",
  components: {
    AuthForm
  },
  methods: {
    ...mapActions({
      login: "user/login"
    }),
    async submit(creds) {
      this.authenticate(this.login, creds);
    }
  }
};
</script>

<style>
</style>
