<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TimerApp",

  props: {
    secondsTime: { type: Number, required: true, default: 0 },
  },

  data() {
    return {
      timerId: 0,
    };
  },

  computed: {
    currentTime(): string {
      return new Date(this.secondsTime * 1000).toISOString().substr(11, 8);
    },
  },
});
</script>

<template>
  <section>
    <strong class="display">{{ currentTime }}</strong>
  </section>
</template>

<style>
.display {
  color: var(--texto-primario);
}
</style>
