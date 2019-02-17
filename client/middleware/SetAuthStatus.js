export default ({ store }) => {
  const token = localStorage.token;

  let data = localStorage.user;
  data = data ? JSON.parse(data) : null;
  store.dispatch('user/setData', { data, token });
};
