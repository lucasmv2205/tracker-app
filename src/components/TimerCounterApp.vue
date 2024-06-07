<script lang="ts">
import { defineComponent } from "vue";
import TimerApp from "./TimerApp.vue";
import AppButton from "./AppButton.vue";

export default defineComponent({
  name: "TimerCounterApp",
  data() {
    return {
      timeInSeconds: 0,
      timerId: 0,
      timerIsrunning: false,
    };
  },
  methods: {
    start() {
      this.timerIsrunning = true;
      this.timerId = setInterval(() => {
        this.timeInSeconds += 1;
      }, 1000);
    },
    finish() {
      this.timerIsrunning = false;
      clearInterval(this.timerId);
      this.$emit("finishTimer", this.timeInSeconds);
      this.timeInSeconds = 0;
    },
  },
  components: { TimerApp, AppButton },
  emits: ["finishTimer"],
});
</script>

<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <TimerApp :seconds-time="timeInSeconds" />
    <AppButton
      @clicked="start"
      icon="fas fa-play"
      text="play"
      :disabled="timerIsrunning"
    />
    <AppButton
      @clicked="finish"
      icon="fas fa-stop"
      text="stop"
      :disabled="!timerIsrunning"
    />
  </div>
</template>
