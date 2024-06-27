<template>
  <expanses-list :list="todaysExpanses" :total-sum="getTotalSumTodaysExpanses"/>
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
    ...mapGetters("expanse", ["todaysExpanses", 'getTotalSumTodaysExpanses']),
  },
  mounted() {},
};
</script>

<style scoped></style>
