<template>
  <div v-if="todaysExpanses.message.length < 0">
    <expanses-list :list="todaysExpanses" />
  </div>
  <p v-else>{{ $t(`EXPANSES.${todaysExpanses.message}`) }}. <Button class="p-0 m-0" link @click="$router.push({ name: 'expanse-add' })" :label="$t('EXPANSES.ADD')"/></p>
</template>

<script>
import { mapGetters } from "vuex";
import ExpansesList from "./components/ExpanseList.vue";
export default {
  components: { ExpansesList },
  name: "TodaysExpanses",
  props: {},
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapGetters("expanse", ["todaysExpanses"]),
  },
  mounted() {},
};
</script>

<style scoped></style>
