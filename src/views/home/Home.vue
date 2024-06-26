<template>
  <div>
    <home-card />
    <div class="my-4 flex items-center">
      <widget-timer class="[flex-grow: 1;] hover:[flex-grow: 3;]" />
    </div>
  </div>
</template>

<script>
import HomeCard from "./components/HomeCard.vue";
import WidgetTimer from "./widgets/WidgetTimer.vue";

export default {
  name: "Home",
  components: {
    HomeCard,
    WidgetTimer,
  },
};
</script>

