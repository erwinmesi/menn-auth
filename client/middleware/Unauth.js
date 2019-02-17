export default ({ redirect, store }) => {
  if (store.getters['user/authenticated']) {
    redirect('/notes');
  }
};
