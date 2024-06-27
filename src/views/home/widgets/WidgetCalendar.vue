<template>
  <!-- <Card class="p-0" v-if="$screen.width > 768">
    <template #content>
      <VCalendar
        :attributes="attributes"
        borderless
        :locale="`${$i18n.locale}`"
      />
    </template>
  </Card>

  <div v-else class='flex items-center justify-center'>
    <VCalendar :attributes="attributes" borderless :locale="`${$i18n.locale}`" expanded/>
  </div> -->
  <VCalendar :attributes="attributes" :is-dark="true" :locale="`${$i18n.locale}`" />
</template>

<script setup>
import { ref } from "vue";

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const attributes = ref([
  {
    key: "today",
    highlight: {
      color: "green",
      fillMode: "solid",
    },
    dates: new Date().toDateString(),
  },
]);
</script>

<style>
.vc-container{
  background: var(--surface-section) !important;
  border-color: var(--surface-border) !important;
}
</style>