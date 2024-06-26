import {
  writeData,
  readData,
  updateData,
  deleteData,
} from "@/utils/databaseActions";

export default {
  namespaced: true,

  state: () => ({
    expanses: [],
  }),

  mutations: {
    SET_EXPANSE(state, payload) {
      state.expanses = payload;
    },
    ADD_EXPANSE(state, expanse) {
      state.expanses.unshift(expanse);
    },
    DELETE_EXPANSE(state, id) {
      state.expanses = state.expanses.filter((item) => item.id !== id);
    },
  },

  actions: {
    async getExpanses({ commit }) {
      try {
        const response = await readData("/expanses");
        if (response.valid) {
          const expansesArray = Object.keys(response.data).map((key) => ({
            id: key,
            ...response.data[key],
          }));
          commit("SET_EXPANSE", expansesArray);
        } else {
          console.log(response.message);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async addExpanse({ commit }, payload) {
      try {
        const id = Math.random().toString(16).slice(2);
        const newExpanse = {
          id,
          type: payload.type,
          sum: payload.sum,
          howMany: payload.howMany,
          item: payload.item,
          date: new Date().toLocaleDateString(),
        };
        const response = await writeData(`/expanses/${id}`, newExpanse);
        if (response.valid) {
          commit("ADD_EXPANSE", newExpanse);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async deleteExpanse({ commit, dispatch }, payload) {
      try {
        const response = await deleteData(`/expanses/${payload.id}`);
        if (response.valid) {
          commit("DELETE_EXPANSE", payload.id);
          await dispatch("expanses/getExpanses");
        }
      } catch (e) {
        console.log(e);
      }
    },
  },

  getters: {
    filteredExpanses: (state) => {
      return state.expanses;
    },
    getExpanseKey: (state) => (expanse) => {
      const found = state.expanses.find(
        (e) =>
          e.type === expanse.type &&
          e.sum === expanse.sum &&
          e.howMany === expanse.howMany &&
          e.item === expanse.item &&
          e.date === expanse.date
      );
      return found ? found.id : null;
    },

    todaysExpanses: (state) => {
      const today = new Date().toLocaleDateString();
      return state.expanses.filter((expanse) => expanse.date === today);
    },
    getTotalSum: (state) => {
      return state.expanses.reduce((acc, item) => acc + item.sum, 0);
    },
    getAllExpanses: (state) => {
      return state.expanses;
    },
  },
};
