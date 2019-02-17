import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions({
      setUserData: 'user/setData'
    }),
    async authenticate(action, creds) {
      this.clearAlerts('VALIDATION_ERROR');

      action(creds)
        .then(({ data }) => {
          window.toastr.success('Authentication successful.');

          localStorage.user = JSON.stringify(data.data);
          localStorage.token = data.token;

          this.setUserData(data);
          this.$router.push({ path: '/notes' });
        })
        .catch(error => {
          this.handleError(error, 'Authentication failed');
        });
    }
  }
};
