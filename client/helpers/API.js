import API from '~/services';

export const apiHelper = apiUrl => ({
  get: (id = null) => {
    return id ? API.get(`${apiUrl}/${id}`) : API.get(`${apiUrl}`);
  },
  post: payload => API.post(`${apiUrl}`, payload),
  put: (id, payload) => API.put(`${apiUrl}/${id}`, payload),
  patch: (id, payload) => API.patch(`${apiUrl}/${id}`, payload),
  delete: id => API.delete(`${apiUrl}/${id}`)
});

export default apiHelper;
