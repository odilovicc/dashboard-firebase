<template>
  <TabView>
    <TabPanel :header="$t('TODO_LIST')">
      <p class="text-xl font-medium" v-if="todoList.length <= 0">
        {{ $t("NO_TODOS") }}
      </p>
      <Accordion v-else class="border border-[--primary-color] rounded-lg">
        <AccordionTab
          class="border"
          v-for="work in todoList"
          :key="work.id"
          :header="work.name"
        >
          <ol>
            <li>
              <h1 class="font-bold">
                {{ $t("NAME") }}:
                <span class="font-normal">{{ work.name }}</span>
              </h1>
            </li>
            <li>
              <h1 class="font-bold">
                {{ $t("DETAILS") }}:
                <span class="font-normal">{{ work.details }}</span>
              </h1>
            </li>
            <li>
              <h1 class="font-bold">
                {{ $t("CREATED_AT") }}:
                <span class="font-normal">{{ work.createdAt }}</span>
              </h1>
            </li>
          </ol>
          <div class="flex items-center gap-2 mt-4">
            <Button
              severity="danger"
              icon="pi pi-trash"
              @click="handleDelete(work.name)"
            />
            <Button icon="pi pi-check" @click="handleDone(work.name)" />
          </div>
        </AccordionTab>
      </Accordion>
    </TabPanel>
    <TabPanel :header="$t('DONE_TODOS')">
      <Accordion
        v-if="doneTodoList.length > 0"
        class="border border-[--primary-color] rounded-lg"
      >
        <AccordionTab
          class="border"
          v-for="work in doneTodoList"
          :key="work.id"
        >
          <template #header>
            <p class="line-through">{{ work.name }}</p>
          </template>
          <template #default>
            <ol>
              <li>
                <h1 class="font-bold">
                  {{ $t("NAME") }}:
                  <span class="font-normal">{{ work.name }}</span>
                </h1>
              </li>
              <li>
                <h1 class="font-bold">
                  {{ $t("DETAILS") }}:
                  <span class="font-normal">{{ work.details }}</span>
                </h1>
              </li>
              <li>
                <h1 class="font-bold">
                  {{ $t("CREATED_AT") }}:
                  <span class="font-normal">{{ work.createdAt }}</span>
                </h1>
              </li>
              <li>
                <h1 class="font-bold">
                  {{ $t("DONE_AT") }}:
                  <span class="font-normal">{{ work.doneTime }}</span>
                </h1>
              </li>
            </ol>
            <div class="flex items-center gap-2 mt-4">
              <Button
                severity="danger"
                icon="pi pi-trash"
                @click="handleDelete(work.name)"
              />
            </div>
          </template>
        </AccordionTab>
      </Accordion>
      <p class="text-xl font-medium" v-else>
        {{ $t("NO_DONE_TODOS") }}
      </p>
    </TabPanel>
  </TabView>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "TodoList",
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState("todo", ["todoList", "doneTodoList"]),
  },
  methods: {
    ...mapActions("todo", ["deleteTodo", "doneTodo"]),
    async handleDelete(name) {
      this.loading = true;
      try {
        await this.deleteTodo(name);
        this.$toast.add({
          summary: this.$t("TODO_DELETED"),
          severity: "success",
          life: 3000,
        });
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
    async handleDone(name) {
      this.loading = true;
      try {
        await this.doneTodo(name);
        this.$toast.add({
          summary: this.$t("TODO_DONE"),
          severity: "success",
          life: 3000,
        });
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.$store.dispatch("todo/fetchTodos");
  },
};
</script>

<style scoped></style>
