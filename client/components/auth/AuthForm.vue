<template>
  <v-layout>
    <v-flex md6>
      <h5 class="headline">{{ heading }}</h5>
      <form @submit.prevent="submit">
        <v-text-field
          :error-messages="errors.collect('e-mail')"
          label="E-mail"
          name="e-mail"
          v-model="creds.email"
          v-validate="'required|email'"
        />
        <v-text-field
          :error-messages="errors.collect('password')"
          label="Password"
          name="password"
          type="password"
          v-model="creds.password"
          v-validate="'required'"
        />
        <nuxt-link v-if="type === 'login'" to="/reset-password">
          <small class="help-text right">Forgot Password?</small>
        </nuxt-link>
        <nuxt-link v-if="type === 'login'" to="/register">
          <small class="help-text left">Doesn't have an account? Register.</small>
        </nuxt-link>
        <nuxt-link v-if="type === 'register'" to="/login">
          <small class="help-text left">Already have an account? Login.</small>
        </nuxt-link>
        <br>
        <v-btn type="submit">submit</v-btn>
      </form>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    heading: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
      validator: function(value) {
        return ["login", "register"].indexOf(value) !== -1;
      }
    }
  },
  data: () => ({
    creds: {}
  }),
  methods: {
    async submit() {
      if (await this.$validator.validateAll()) {
        this.$emit("submit", this.creds);
      }
    }
  }
};
</script>

<style lang="sass">
.help-text
  color: deeppink
</style>
