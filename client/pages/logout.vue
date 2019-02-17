<template>
  <p>Logging out...</p>
</template>

<script>
import { mapActions } from "vuex";
import LogoutMiddleware from "~/middleware/Logout";

export default {
  layout: "guarded",
  middleware: [LogoutMiddleware]
};
</script>

<style>
</style>
