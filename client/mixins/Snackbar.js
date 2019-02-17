export default {
  methods: {
    toast(snackbarText) {
      this.$nuxt.$emit('SHOW_SNACKBAR', snackbarText);
    }
  }
};
