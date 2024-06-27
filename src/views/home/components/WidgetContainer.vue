<template>
  <Accordion v-if="$screen.width < 768">
    <accordion-tab :header="$t('WIDGET.TIMER')">
      <widget-timer version="mobile" />
    </accordion-tab>
    <accordion-tab :header="$t('WIDGET.CALENDAR')">
      <widget-calendar version="mobile" />
    </accordion-tab>
  </Accordion>
  <div v-else class="flex justify-between py-4">
    <widget-timer version="desktop" />
    <widget-calendar version="desktop" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import WidgetCalendar from "../widgets/WidgetCalendar";
import WidgetTimer from "../widgets/WidgetTimer";
export default {
  components: {
    WidgetCalendar,
    WidgetTimer,
  },
  name: "WidgetContainer",
  props: {},
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapGetters('expanses', ['todaysExpanses'])
  },
  mounted() {},
};
</script>

<style scoped></style>
