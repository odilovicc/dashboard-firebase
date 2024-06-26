<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-xl font-semibold">{{ $t("EXPANSES") }}</h1>
      <Button :label="$t('ADD')" icon="pi pi-plus" @click="visible = true" />
    </div>
  </div>

  <div v-if="filteredExpanses.length > 0">
    <expanse-list :list="filteredExpanses" />
  </div>
  <p v-else>{{ $t("EXPANSE_NO_AVAILABLE") }}</p>

  <Dialog
    v-model:visible="visible"
    modal
    :header="$t('ADD_EXPANSE')"
    @hide="clearInputs"
  >
    <template #default>
      <form-container>
        <field :label="$t('EXPANSE_TYPE')">
          <dropdown
            :options="expanseTypes"
            option-label="name"
            :placeholder="$t('EXPANSE_TYPE')"
            v-model="selectedExpanseType"
          />
        </field>
        <field :label="$t('EXPANSE_SUM')">
          <input-number v-model="expanseSum" :placeholder="$t('EXPANSE_SUM')" />
        </field>
        <field
          :label="$t('EXPANSE_ITEM')"
          v-if="selectedExpanseType.name !== $t('EXPANSE_PTRANSPORT')"
        >
          <input-text v-model="expanseItem" :placeholder="$t('EXPANSE_ITEM')" />
        </field>
        <field :label="$t('EXPANSE_HMANY')">
          <input-number
            v-model="expanseHMany"
            :placeholder="$t('EXPANSE_HMANY')"
          />
        </field>
      </form-container>
    </template>
    <template #footer>
      <Button :label="$t('ADD')" @click="addExpansee" />
    </template>
  </Dialog>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import ExpanseList from "./components/ExpanseList.vue";

export default {
  name: "ChatBot",
  props: {},
  components: { ExpanseList },
  data() {
    return {
      visible: false,
      selectedExpanseType: "",
      expanseSum: null,
      expanseHMany: null,
      expanseItem: "",
      expanseTypes: [
        { name: this.$t("EXPANSE_PTRANSPORT") },
        { name: this.$t("EXPANSE_FOOD") },
      ],
    };
  },
  methods: {
    ...mapActions("expanse", ["addExpanse", "getExpanses"]),
    async addExpansee() {
      try {
        await this.addExpanse(this.expanseContent);
      } catch (e) {
        console.error(e);
      } finally {
        this.visible = false;
        this.clearInputs;
      }
    },
    clearInputs() {
      this.selectedExpanseType = "";
      this.expanseHMany = null;
      this.expanseSum = null;
      this.expanseItem = "";
    },
  },
  computed: {
    ...mapGetters("expanse", ["filteredExpanses", 'todaysExpanses']),
    expanseContent() {
      if (this.selectedExpanseType.name === this.$t("EXPANSE_PTRANSPORT")) {
        return {
          type: this.selectedExpanseType.name,
          sum: this.expanseSum,
          howMany: this.expanseHMany,
          item: "Билет",
        };
      } else {
        return {
          type: this.selectedExpanseType.name,
          sum: this.expanseSum,
          howMany: this.expanseHMany,
          item: this.expanseItem,
        };
      }
    },
  },
  mounted() {
    this.$store.dispatch("expanse/getExpanses");
  },
};
</script>

<style scoped></style>
