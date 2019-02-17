export default {
  methods: {
    clearAlerts(id) {
      this.$nuxt.$emit('CLEAR_ALERTS', id);
    }
  }
};
