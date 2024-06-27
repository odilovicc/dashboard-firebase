<template>
  <Text v-if="list.length === 0">{{ $t("EXPANSES.NO_AVAILABLE") }}</Text>
  <div v-else>
    <DataTable show-gridlines :value="list" tableStyle="min-width: 50rem">
      <Column sortable field="type" :header="$t('EXPANSE_TYPE')"></Column>
      <Column field="howMany" :header="$t('EXPANSE_HMANY')"></Column>
      <Column field="item" :header="$t('EXPANSE_ITEM')"></Column>
      <Column sortable field="sum" :header="$t('EXPANSE_SUM')"></Column>
      <Column sortable field="date" :header="$t('EXPANSE_DATE')"></Column>
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
    <Text v-if="totalSum > 0" version="small-heading" class="mt-6 text-right">
      {{ `${$t("EXPANSES.TOTAL")}:` }} {{ totalSum }}
    </Text>
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
    totalSum: String,
  },
  data() {
    return {};
  },
  methods: {
    deleteExpanse(data) {
      this.$store.dispatch("expanse/deleteExpanse", {
        id: this.getExpanseKey(data),
      });
      this.$store.dispatch("expanse/getExpanses");
    },
  },
  computed: {
    ...mapGetters("expanse", ["getExpanseKey"]),
  },
  mounted() {},
};
</script>

<style scoped></style>
