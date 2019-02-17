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
import AuthMiddleware from "~/middleware/Auth";
import SetAuthStatusMiddleware from "~/middleware/SetAuthStatus";

export default {
  components: {
    Navbar,
    Alerts
  },
  middleware: [SetAuthStatusMiddleware, AuthMiddleware],
  watch: {
    $route(to, from) {
      this.clearAlerts();
    }
  }
};
</script>
