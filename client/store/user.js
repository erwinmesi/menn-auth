import factory from '~/factories';

const userService = factory('service', 'user');

export default {
  state: () => {
    return {
      user: {},
      token: false
    };
  },
  getters: {
    authenticated: ({ token }) => !!token
  },
  actions: {
    login: (context, data) => userService.login(data),
    register: (context, data) => userService.register(data),
    sendPasswordResetLink: (context, data) =>
      userService.sendPasswordResetLink(data),
    resetPassword: (context, data) => userService.resetPassword(data),
    logout: ({ commit }) => {
      delete localStorage.token;
      delete localStorage.user;
      commit('SET_USER', null);
      commit('SET_TOKEN', null);
    },
    setData: ({ commit }, { data, token }) => {
      commit('SET_USER', data);
      commit('SET_TOKEN', token);
    }
  },
  mutations: {
    SET_USER: (state, user) => (state.user = user),
    SET_TOKEN: (state, token) => (state.token = token)
  }
};
