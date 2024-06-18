import { readData, writeData, deleteData, updateData } from "@/utils/databaseActions";
import i18n from "@/i18n";

export default {
  namespaced: true,
  state: () => ({
    todoList: [],
    doneTodoList: [],
  }),
  mutations: {
    SET_TODOS(state, payload) {
      state.todoList = payload.filter(todo => !todo.done);
      state.doneTodoList = payload.filter(todo => todo.done);
    },
    ADD_TODO(state, todo) {
      state.todoList.push(todo);
    },
    REMOVE_TODO(state, todoName) {
      state.todoList = state.todoList.filter(todo => todo.name !== todoName);
      state.doneTodoList = state.doneTodoList.filter(todo => todo.name !== todoName);
    },
    MARK_TODO_DONE(state, todoName) {
      const todoIndex = state.todoList.findIndex(todo => todo.name === todoName);
      if (todoIndex !== -1) {
        const [doneTodo] = state.todoList.splice(todoIndex, 1);
        doneTodo.done = true;
        doneTodo.doneTime = new Date().toISOString();
        state.doneTodoList.push(doneTodo);
      }
    }
  },
  actions: {
    async fetchTodos({ commit }) {
      try {
        const response = await readData("/todos");
        if (response.valid) {
          const todos = response.data ? Object.values(response.data) : [];
          commit("SET_TODOS", todos);
        } else {
          console.log(response.message);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async addTodo({ commit, dispatch }, payload) {
      try {
        const response = await writeData(`/todos/${payload.name}`, {
          name: payload.name,
          details: payload.details,
          createdAt: new Date().toLocaleDateString(),
          id: Math.random().toString(16).slice(2),
          done: false,
        });

        if (response.valid) {
          await dispatch("fetchTodos");
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error(i18n.t('TODO_ADD_ERROR'), error);
      }
    },
    async deleteTodo({ commit, dispatch }, todoName) {
      try {
        const response = await deleteData(`/todos/${todoName}`);
        if (response.valid) {
          commit("REMOVE_TODO", todoName);
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error(i18n.t('TODO_DELETE_ERROR'), error);
      }
    },
    async doneTodo({ commit, dispatch }, todoName) {
      try {
        const doneTime = new Date().toLocaleDateString();
        const response = await updateData(`/todos/${todoName}`, { done: true, doneTime: doneTime });
        if (response.valid) {
          commit("MARK_TODO_DONE", todoName);
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error(i18n.t('TODO_DONE_ERROR'), error);
      }
    },
  },
};
