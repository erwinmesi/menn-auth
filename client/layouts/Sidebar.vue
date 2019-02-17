<template>
  <v-navigation-drawer v-model="drawer" fixed app>
    <v-list>
      <template v-for="(item, i) in items">
        <v-list-tile
          :key="i"
          :to="item.to"
          router
          exact
          @click="toggleSidebar(false)"
          v-if="item.show"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"/>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";

export default {
  created() {
    this.items = [
      {
        icon: "home",
        title: "Home",
        to: "/",
        show: true
      },
      {
        icon: "edit",
        title: "User Notes",
        to: "/notes",
        show: this.authenticated
      },
      {
        icon: "exit_to_app",
        title: "Login",
        to: "/login",
        show: !this.authenticated
      },
      {
        icon: "edit",
        title: "Register",
        to: "/register",
        show: !this.authenticated
      },
      {
        icon: "power_settings_new",
        title: "Logout",
        to: "/logout",
        show: this.authenticated
      }
    ];

    this.$nuxt.$on("sidebarToggled", this.toggleSidebar);
  },
  computed: {
    authenticated() {
      return !!this.$store.getters["user/authenticated"];
    }
  },
  data() {
    return {
      drawer: false,
      items: [],
      title: "MENN Project"
    };
  },
  methods: {
    toggleSidebar(value = !this.drawer) {
      this.drawer = value;
    }
  }
};
</script>

<style>
</style>
