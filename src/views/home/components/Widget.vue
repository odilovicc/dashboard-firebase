<template>
  <div>
    <Card v-if="$screen.width > 768 && version === 'desktop'">
      <template #title><slot name="title" /></template>
      <template #content>
        <slot name="default" />
      </template>
    </Card>

    <div v-if="version === 'mobile'">
      <slot name="mobile" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Widget",
  props: {
    version: String,
  },
  data() {
    return {};
  },
  methods: {},
  computed: {},
  mounted() {},
};
</script>

<style scoped></style>
