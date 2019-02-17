import apiHelper from '~/helpers/API';
import API from '~/services';

const AUTH_URL = '/auth';
const USER_URL = '/user';

export default {
  ...apiHelper(USER_URL),
  login: data => API.post(`${AUTH_URL}/login`, data),
  register: data => API.post(`${AUTH_URL}/register`, data),
  sendPasswordResetLink: data =>
    API.post(`${AUTH_URL}/send-password-reset-link`, data),
  resetPassword: data => API.post(`${AUTH_URL}/reset-password`, data)
};
