<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
import FormApp from "../components/FormApp.vue";
import TaskApp from "../components/TaskApp.vue";
import ITask from "../interfaces/ITask";
import { useStore } from "@/store";
import useNotifier from "@/hooks/notifier";
import {
  GET_TASKS,
  GET_PROJECTS,
  REGISTER_TASK,
  UPDATE_TASK,
} from "@/store/type-actions";
import ModalApp from "@/components/ModalApp.vue";

export default defineComponent({
  name: "TaskView",
  components: { FormApp, TaskApp, ModalApp },

  data() {
    return {
      selectedTask: null as ITask | null,
    };
  },

  methods: {
    saveTask(task: ITask) {
      this.store.dispatch(REGISTER_TASK, task);
    },
    selectTask(task: ITask) {
      this.selectedTask = task;
    },
    closeModal() {
      this.selectedTask = null;
    },
    updateTask() {
      this.store
        .dispatch(UPDATE_TASK, this.selectedTask)
        .then(() => this.closeModal());
    },
  },

  setup() {
    const store = useStore();
    store.dispatch(GET_TASKS);
    store.dispatch(GET_PROJECTS);
    const { notify } = useNotifier();
    const filter = ref("");

    // const tasks = computed(() =>
    //   store.state.task.tasks.filter(
    //     (t) => !filter.value || t.description.includes(filter.value)
    //   )
    // );

    watchEffect(() => {
      store.dispatch(GET_TASKS, filter.value);
    });

    return {
      tasks: computed(() => store.state.task.tasks),
      store,
      notify,
      filter,
    };
  },
});
</script>

<template>
  <FormApp @save-task="saveTask" />
  <div class="lista">
    <div class="field">
      <p class="control has-icons-left">
        <input
          class="input"
          type="text"
          placeholder="Find tasks"
          v-model="filter"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <div v-if="tasks.length === 0" class="box has-text-weight-bold">
      You are not very productive today!
    </div>
    <TaskApp
      v-else
      v-for="(task, index) in tasks"
      :task="task"
      :key="index"
      @handle-clicked-task="selectTask"
    />
    <ModalApp v-if="selectedTask != null" :show="selectedTask != null">
      <template v-slot:cabecalho>
        <p class="modal-card-title">Editando uma tarefa</p>
        <button @click="closeModal" class="delete" aria-label="close"></button>
      </template>
      <template v-slot:corpo>
        <div class="field">
          <label for="taskDescription" class="label"> Descrição </label>
          <input
            type="text"
            class="input"
            v-model="selectedTask.description"
            id="taskDescription"
          />
        </div>
      </template>
      <template v-slot:rodape>
        <button @click="updateTask" class="button is-success">
          Salvar alterações
        </button>
        <button @click="closeModal" class="button">Cancelar</button>
      </template>
    </ModalApp>
  </div>
</template>

<style>
.lista {
  padding: 1.25rem;
}
</style>
