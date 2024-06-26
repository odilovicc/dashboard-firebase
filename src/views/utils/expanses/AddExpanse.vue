<template>
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
      <input-number v-model="expanseHMany" :placeholder="$t('EXPANSE_HMANY')" />
    </field>
    <Button :label="$t('ADD')" @click="addExpansee" />
  </form-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "ChatBot",
  props: {},
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
        this.$toast.add({
          severity: "success",
          summary: this.$t("EXPANSES.ADDED"),
          life: 3000,
        })
        this.$router.push({name: 'expanse-today'})
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
    ...mapGetters("expanse", ["filteredExpanses", "todaysExpanses"]),
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
};
</script>

<style scoped></style>
