<template>
  <Button @click="addTodo" label="Add Todo" icon="pi pi-plus"/>
  <div class="flex justify-center gap-16">
    <div
      class="p-2 bg-gray-300 rounded-lg flex flex-col gap-2 min-w-[16rem]"
      @drop="onDrop($event, 'undone')"
      @dragenter.prevent
      @dragover.prevent
    >
      <h2>Undone</h2>
      <transition-group name="list" tag="div" class="flex flex-col gap-2">
        <div
          v-for="item in undoneItems"
          class="p-2 bg-white rounded-lg"
          :key="item.id"
          draggable="true"
          @dragstart="startDrag($event, item)"
        >
          {{ item.label }}
        </div>
      </transition-group>
    </div>
    <div
      class="p-2 bg-gray-300 rounded-lg flex flex-col gap-2 min-w-[16rem]"
      @drop="onDrop($event, 'done')"
      @dragenter.prevent
      @dragover.prevent
    >
      <h2>Done</h2>
      <transition-group name="list" tag="div" class="flex flex-col gap-2">
        <div
          v-for="item in doneItems"
          class="p-2 bg-white rounded-lg"
          :key="item.id"
          draggable="true"
          @dragstart="startDrag($event, item)"
        >
          {{ item.label }}
        </div>
      </transition-group>
    </div>
  </div>
  {{todoList}}
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: "TodoApp",
  data() {
    return {
      items: this.todoList,
      draggedItem: null,
    };
  },
  computed: {
    ...mapState('test', ['todoList']),
    ...mapGetters('test', ['undoneItems', 'doneItems']),
  },
  methods: {
    startDrag(event, item) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      this.draggedItem = item;
    },
    onDrop(event, newStatus) {
      event.preventDefault();
      if (this.draggedItem) {
        this.draggedItem.status = newStatus;
        this.draggedItem = null;
      }
    },
    addTodo() {
      this.$store.dispatch("test/addTodo", {
        id: Math.random().toString(16).slice(2),
        label: "New Todo",
        status: "undone",
      })
    }
  },
};
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
