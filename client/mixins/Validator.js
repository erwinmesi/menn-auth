export default {
  methods: {
    async validate() {
      return await this.$validator.validateAll();
    }
  }
};
