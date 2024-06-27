<template>
  <div>
    <home-card />

    <widget-container class="mt-4 md:mt-0"/>
  </div>
</template>

<script>
import HomeCard from "./components/HomeCard.vue";
import WidgetContainer from './components/WidgetContainer.vue'
export default {
  name: "Home",
  components: {
    HomeCard,
    WidgetContainer
  },
};
</script>
