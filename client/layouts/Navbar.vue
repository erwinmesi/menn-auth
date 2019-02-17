<template>
  <div>
    <sidebar/>
    <v-toolbar fixed app>
      <v-toolbar-side-icon @click="sidebarToggled"/>
      <v-toolbar-title v-text="title"/>
    </v-toolbar>
  </div>
</template>

<script>
import Sidebar from "~/layouts/Sidebar";
export default {
  components: {
    Sidebar
  },
  data() {
    return {
      title: "MENN Project"
    };
  },
  methods: {
    sidebarToggled() {
      this.$nuxt.$emit("sidebarToggled");
    }
  }
};
</script>

<style>
</style>
