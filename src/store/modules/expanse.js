export default {
  namespaced: true,

  state: () => ({
    expanses: ["12"],
  }),

  mutations: {
    SET_EXPANSE(state, payload) {
      state.expanse = payload;
    },
  },

  actions: {
    async getExpanses({ commit }, payload) {
      try {
        const response = await readData("/expanses");
        if (response.valid) {
          const expanses = response.data ? Object.values(response.data) : [];
          commit("SET_TODOS", todos);
        } else {
          console.log(response.message);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async addExpanse({ commit }, payload) {
      console.log(payload);
    },
  },
};
