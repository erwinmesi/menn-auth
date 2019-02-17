import factory from '~/factories';

const noteService = factory('service', 'note');

export default {
  state: () => {
    return {
      list: []
    };
  },
  getters: {},
  actions: {
    get: async ({ commit, rootState }) => {
      const { data } = await noteService.get(rootState.user.user._id);
      commit('STORE_NOTES', data.data);
    },
    store: async ({ dispatch }, data) => {
      await noteService.post(data);
      dispatch('get');
    },
    delete: async ({ dispatch }, id) => {
      await noteService.delete(id);
      dispatch('get');
    }
  },
  mutations: {
    STORE_NOTES: (state, notes) => {
      state.list = notes;
    }
  }
};
