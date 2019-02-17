import axios from 'axios';
import lodashGet from 'lodash.get';

const API = axios.create({
  baseURL: process.env.BASE_API_URL
});

API.interceptors.request.use(config => {
  const token = localStorage.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers['Content-Type'] = 'application/json; charset=utf-8';
  config.headers.Accept = 'application/json';

  return config;
});

API.interceptors.response.use(
  response => {
    return Promise.resolve(response);
  },
  error => {
    const errorName = lodashGet(error, 'response.data.error.name');

    switch (errorName) {
      case 'TokenExpiredError':
        return updateToken().then(response => {
          const token = lodashGet(response, 'data.token', 'x.x.x');
          localStorage.token = token;
          console.log('localStorage.token', localStorage.token);
          error.config.headers.Authorization = `Bearer ${token}`;
          return axios.request(error.config);
        });

      case 'JsonWebTokenError':
        delete localStorage.token;
        delete localStorage.user;
        location.href = '/';
        break;

      default:
        break;
    }

    return Promise.reject(error);
  }
);

const updateToken = () => {
  return API.get('/auth/refresh-token');
};

export default API;
