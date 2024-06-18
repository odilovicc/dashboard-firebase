<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-xl font-semibold">{{ $t("TODO_LIST") }}</h1>
      <Button :label="$t('ADD')" icon="pi pi-plus" @click="visible = true" />
    </div>
    <progress-spinner v-if="loading" />
    <todo-list :list="todoList" v-if="!loading" />

    <!-- Dialog -->
    <Dialog
      v-model:visible="visible"
      modal
      :header="$t('ADD_TODO')"
      :style="{ width: '25rem' }"
    >
      <template #default>
        <form-container>
          <field :label="$t('NAME')">
            <input-text v-model="nameTodo" :placeholder="$t('NAME')" />
          </field>
          <field :label="$t('DETAILS')">
            <Textarea
              :placeholder="$t('DETAILS')"
              v-model="detailsTodo"
            ></Textarea>
          </field>
        </form-container>
      </template>
      <template #footer>
        <Button :label="$t('ADD_TODO')" icon="pi pi-plus" @click="addTodo" />
      </template>
    </Dialog>
    <!-- Dialog -->
  </div>
</template>

<script>
import TodoList from "./components/TodoList.vue";
import { mapState } from "vuex";

export default {
  name: "Todo",
  components: {
    TodoList,
  },
  data() {
    return {
      visible: false,
      nameTodo: "",
      detailsTodo: "",
      loading: false,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      todoList: (state) => state.todo.todoList,
    }),
  },
  async mounted() {
    this.loading = true;
    try {
      await this.$store.dispatch("todo/fetchTodos");
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    addTodo() {
      if (this.nameTodo && this.detailsTodo) {
        this.$store
          .dispatch("todo/addTodo", {
            name: this.nameTodo,
            details: this.detailsTodo,
          })
          .then(() => {
            this.visible = false;
            this.nameTodo = "";
            this.detailsTodo = "";
          })
          .catch((error) => {
            console.error("Error adding todo:", error);
          });
      }
    },
  },
};
</script>

<style scoped></style>
