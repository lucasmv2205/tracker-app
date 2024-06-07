<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import TimerCounterApp from "./TimerCounterApp.vue";

import { key } from "@/store";
import { NOTIFY } from "@/store/type-mutations";
import { NotificationType } from "@/interfaces/INotification";

export default defineComponent({
  name: "FormApp",

  // data() {
  //   return {
  //     description: "",
  //     projectId: "",
  //   };
  // },

  components: { TimerCounterApp },

  // methods: {
  //   finishTask(currentTime: number): void {
  //     const project = this.projects.find((p) => p.id == this.projectId);
  //     if (!project) {
  //       this.store.commit(NOTIFY, {
  //         titulo: "Ops!",
  //         texto: "Selecione um project antes de finalizar a tarefa!",
  //         tipo: NotificationType.FALHA,
  //       }); // notificamos o usuário
  //       return;
  //     }
  //     this.$emit("saveTask", {
  //       duracaoEmSegundos: currentTime,
  //       description: this.description,
  //       project: this.projects.find((proj) => proj.id === this.projectId),
  //     });
  //     this.description = "";
  //   },
  // },

  setup(props, { emit }) {
    const store = useStore(key);

    const description = ref("");
    const projectId = ref("");

    const projects = computed(() => store.state.project.projects);

    const finishTask = (currentTime: number): void => {
      const project = projects.value.find(
        (p: { id: string }) => p.id == projectId.value
      );
      if (!project) {
        store.commit(NOTIFY, {
          title: "Ops!",
          text: "Select a project before finish a task!",
          type: NotificationType.ERROR,
        });
        return;
      }
      emit("saveTask", {
        secondsDuration: currentTime,
        description: description.value,
        project: projects.value.find(
          (proj: { id: string }) => proj.id === projectId.value
        ),
      });
      description.value = "";
    };

    return {
      description,
      projectId,
      projects,
      store,
      finishTask,
    };
  },

  emits: ["saveTask"],
});
</script>

<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Formulario para criação de uma nova tarefa"
      >
        <input
          type="text"
          placeholder="Start your task here..."
          class="input"
          v-model="description"
        />
      </div>

      <div class="column is-3">
        <div class="select">
          <select v-model="projectId">
            <option value="">Select project</option>
            <option
              v-for="project in projects"
              :key="project.id"
              :value="project.id"
            >
              {{ project.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="column">
        <TimerCounterApp @finish-timer="finishTask" />
      </div>
    </div>
  </div>
</template>

<style>
.formulario {
  background-color: var(--bg-primario);
  color: var(--texto-primario);
}
</style>
