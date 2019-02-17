const axios = require('axios');

const sendPasswordResetLink = mail => {
  return axios.post(`${process.env.EMAIL_PROVIDER_URL}/api/send-email`, mail);
};

module.exports = {
  sendPasswordResetLink
};
