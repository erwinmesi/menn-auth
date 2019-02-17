<template>
  <v-app>
    <navbar/>
    <v-content>
      <alerts/>
      <v-container>
        <nuxt/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "~/layouts/Navbar";
import Alerts from "~/components/custom/Alerts";

export default {
  components: {
    Navbar,
    Alerts
  },
  watch: {
    $route(to, from) {
      this.clearAlerts();
    }
  }
};
</script>
