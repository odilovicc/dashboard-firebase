<template>
  <div>
    <expanses-list :list="todaysExpanses" />
  </div>
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
    ...mapGetters("expanse", ["todaysExpanses",]),
  },
  mounted() {},
};
</script>

<style scoped></style>
