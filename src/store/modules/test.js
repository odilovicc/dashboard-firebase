export default {
  namespaced: true,
  state: () => ({
    todoList: [
      { id: 1, label: "Item 1", status: "undone" },
      { id: 2, label: "Item 2", status: "undone" },
      { id: 3, label: "Item 3", status: "done" },
    ],
  }),
  mutations: {
    ADD_TODO(state, todo) {
      state.todoList.push(todo);
    },
  },
  actions: {
    addTodo({ commit }, todo) {
      commit("ADD_TODO", todo);
    },
    
  },
  getters: {
    undoneItems(state) {
        return state.todoList.filter((item) => item.status === "undone");
    },
    doneItems(state) {
        return state.todoList.filter((item) => item.status === "done");
    },
  },
};
