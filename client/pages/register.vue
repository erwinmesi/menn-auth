<template>
  <auth-form type="register" heading="Register" @submit="submit"/>
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
      register: "user/register"
    }),
    async submit(creds) {
      this.authenticate(this.register, creds);
    }
  }
};
</script>

<style>
</style>
