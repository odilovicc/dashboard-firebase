<template>
  <div>
    <DataTable show-gridlines :value="list" tableStyle="min-width: 50rem">
      <Column field="type" :header="$t('EXPANSE_TYPE')"></Column>
      <Column field="howMany" :header="$t('EXPANSE_HMANY')"></Column>
      <Column field="item" :header="$t('EXPANSE_ITEM')"></Column>
      <Column field="sum" :header="$t('EXPANSE_SUM')"></Column>
      <Column field="date" :header="$t('EXPANSE_DATE')"></Column>
      <Column :header="$t('ACTIONS')">
        <template #body="slotProps">
          <div class="flex items-center justify-center">
            <Button
              icon="pi pi-trash"
              severity="danger"
              @click="deleteExpanse(slotProps.data)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ExpanseList",
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    deleteExpanse(data) {
      this.$store.dispatch("expanse/deleteExpanse", {
        id: this.getExpanseKey(data),
      });
    },
  },
  computed: {
    ...mapGetters("expanse", ["getExpanseKey"]),
  },
  mounted() {},
};
</script>

<style scoped></style>
