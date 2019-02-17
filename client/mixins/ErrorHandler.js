import factory from '~/factories';
const joiHelper = factory('helper', 'joi');

export default {
  methods: {
    handleError(
      error,
      fallbackMsg = 'Something went wrong.',
      fallbackName = 'Error'
    ) {
      error = this.$lodashGet(error, 'data.error', {});
      if (error.isExpected) {
        const name = error.name || fallbackName;
        const msg = error.message || fallbackMsg;
        window.toastr.error(`${name}: ${msg}`);
      } else if (error.isJoi) {
        const name = error.name || fallbackName;
        const msg = error.message || fallbackMsg;

        const errors = joiHelper.toArray(error.details);

        this.$nuxt.$emit('ADD_ALERT', {
          id: 'VALIDATION_ERROR',
          items: errors,
          type: 'error'
        });

        window.toastr.error(`${name}: ${msg}`);
      } else {
        window.toastr.error(`${fallbackName}: ${fallbackMsg}`);
      }
    }
  }
};
