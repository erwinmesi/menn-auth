const { EMAIL_PROVIDER_URL } = require('./../env');
const axios = require('axios');

const sendPasswordResetLink = mail => {
  return axios.post(`${EMAIL_PROVIDER_URL}/api/send-email`, mail);
};

module.exports = {
  sendPasswordResetLink
};
