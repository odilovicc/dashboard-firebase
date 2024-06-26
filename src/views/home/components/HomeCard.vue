<template>
  <div>
    <Card>
      <template #content>
        <div class="flex items-center justify-between">
          <Text version="small-heading">{{
            $t("WELCOME", { name: user.displayName })
          }}</Text>
          <div class="relative">
            <Button icon="pi pi-bell" @click="toggle" />
            <span v-if="todoList.length > 0" class="text-white absolute -top-3 -right-4 p-0.5 px-2 rounded-full bg-red-500">{{
              todoList.length
            }}</span>
          </div>
        </div>
      </template>
    </Card>
    <TieredMenu ref="menu" id="overlay_tmenu" popup :model="todoList">
      <template v-if="todoList.length > 0" #item="{ item, props, index }">
        <router-link
          v-if="todoList.length > 0"
          :to="{ name: 'todo' }"
          class="flex gap-3 p-2 items-center"
          @click.native="handleItemClick(item.name)"
        >
          <span class="pi pi-check-square" />
          <span>{{ $t("UNDONE_TODO", { todo: item.name }) }}</span>
        </router-link>
        <p v-else>1</p>
      </template>
      <template #end v-else>
        <p class="p-3">{{ $t("NO_NOTIF") }}</p>
      </template>
    </TieredMenu>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { getAuth } from "firebase/auth";
export default {
  data() {
    return {
      user: getAuth().currentUser,
    };
  },
  computed: {
    ...mapState({
      todoList: (state) => state.todo.todoList, // assuming todo module has a todos array
    }),
  },
  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event);
    },
    handleItemClick(index) {
      console.log(index);
    },
  },
  async mounted() {
    await this.$store.dispatch("todo/fetchTodos");
  },
};
</script>
