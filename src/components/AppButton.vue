<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppButton",
  emits: ["clicked"],
  props: {
    disabled: {
      type: Boolean,
    },
    icon: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  methods: {
    clicked(): void {
      this.$emit("clicked");
    },
  },
});
</script>

<template>
  <button class="button" @click="clicked" :disabled="disabled">
    <span class="icon">
      <i :class="icon"></i>
    </span>
    <span>{{ text }}</span>
  </button>
</template>
