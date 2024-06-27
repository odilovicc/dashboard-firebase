<template>
  <Widget>
    <template #default>
      <Text version="small-heading">{{ $t("WIDGET.TIMER") }}</Text>
      <div class="py-3">
        <p class="font-bold text-5xl text-">{{ formattedTimer }}</p>

        <div class="flex items-center gap-5 mt-4">
          <Button
            @click="startTimer"
            :label="$t('WIDGET.START')"
            icon="pi pi-clock"
          />
          <Button
            @click="stopTimer"
            :label="$t('WIDGET.STOP')"
            icon="pi pi-stop"
          />
          <Button
            @click="resetTimer"
            :label="$t('WIDGET.RESET')"
            icon="pi pi-refresh"
          />
        </div>
      </div>
    </template>
    <template #mobile>
      <div class="py-3">
        <p class="font-bold text-5xl text-">{{ formattedTimer }}</p>

        <div class="flex items-center gap-5 mt-4">
          <Button
            @click="startTimer"
            :label="$t('WIDGET.START')"
            icon="pi pi-clock"
          />
          <Button
            @click="stopTimer"
            :label="$t('WIDGET.STOP')"
            icon="pi pi-stop"
          />
          <Button
            @click="resetTimer"
            :label="$t('WIDGET.RESET')"
            icon="pi pi-refresh"
          />
        </div>
      </div>
    </template>
  </Widget>
</template>

<script>
export default {
  name: "WidgetTimer",
  props: {},
  data() {
    return {
      timer: 0,
      timerId: null,
    };
  },
  methods: {
    startTimer() {
      this.timerId = setInterval(() => {
        this.timer += 1;
      }, 1000);
    },
    stopTimer() {
      clearInterval(this.timerId);
    },
    resetTimer() {
      this.timer = 0;
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
    },
  },
  computed: {
    formattedTimer() {
      const hours = Math.floor(this.timer / 3600);
      const minutes = Math.floor((this.timer % 3600) / 60);
      const seconds = this.timer % 60;

      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    },
  },
  mounted() {},
};
</script>

<style scoped></style>
