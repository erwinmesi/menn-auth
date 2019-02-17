export default ({ redirect, store }) => {
  if (store.getters['user/authenticated']) {
    store.dispatch('user/logout');
    redirect('/login');
  }
};
