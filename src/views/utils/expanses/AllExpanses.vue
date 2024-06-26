<template>
  <div>
    <expanses-list :list="getAllExpanses" />
  </div>
</template>

<script>
import ExpansesList from "@/views/utils/expanses/components/ExpanseList.vue";
import {mapGetters} from 'vuex'
export default {
  components: { ExpansesList },
  name: "AllExpanses",
  props: {},
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapGetters("expanse", ["getAllExpanses"]),
  },
  mounted() {},
};
</script>

<style scoped></style>
