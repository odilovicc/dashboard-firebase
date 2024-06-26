<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-xl font-semibold">
        {{ $t(`EXPANSES.${giveRouteName}`) }}
      </h1>
    </div>
    <divider class="mb-6"/>
    <router-view />

    
  </div>
</template>

<script>
export default {
  name: "layout",
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    giveRouteName() {
      return this.$route.name.split("expanse-").join("").toUpperCase();
    },
  },
  async mounted() {
    this.loading = true;
    try {
      this.$store.dispatch("expanse/getExpanses");
    } catch {
      console.error("Error fetching expanses");
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped></style>
