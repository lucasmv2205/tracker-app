<script lang="ts">
import { PropType, defineComponent } from "vue";
import TimerApp from "./TimerApp.vue";
import ITask from "@/interfaces/ITask";

export default defineComponent({
  name: "TaskApp",
  props: {
    task: { type: Object as PropType<ITask>, required: true },
  },
  methods: {
    clickedTask(): void {
      this.$emit("handleClickedTask", this.task);
    },
  },
  components: { TimerApp },
  emits: ["handleClickedTask"],
});
</script>

<template>
  <div class="box has-text-weight-bold">
    <div class="columns clicavel" @click="clickedTask">
      <div class="column is-4">
        {{ task.description || "Tarefa sem descricao" }}
      </div>

      <div class="column is-3">
        {{ task.project?.name || "N/D" }}
      </div>

      <div class="column">
        <TimerApp :seconds-time="task.secondsDuration" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.box {
  background: #faf0ca;
}
.clicavel {
  cursor: pointer;
}
</style>
