<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import useNotifier from "@/hooks/notifier";
import { GET_PROJECTS, REMOVE_PROJECT } from "@/store/type-actions";
import { NotificationType } from "@/interfaces/INotification";

export default defineComponent({
  name: "ProjectsList",
  methods: {
    deleteProject(id: string) {
      this.store.dispatch(REMOVE_PROJECT, id).then(() => {
        this.notify(
          NotificationType.SUCCESS,
          "SUCCESS",
          "Projeto removido com sucesso"
        );
      });
    },
  },
  setup() {
    const store = useStore();
    store.dispatch(GET_PROJECTS);
    const { notify } = useNotifier();
    return {
      projects: computed(() => store.state.project.projects),
      store,
      notify,
    };
  },
});
</script>

<template>
  <section class="projetos">
    <RouterLink to="projects/new" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
      </span>
      <span>New project</span>
    </RouterLink>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Acões</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ project.name }}</td>
          <td>
            <RouterLink :to="`/projects/${project.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </RouterLink>
            <button
              class="button ml-2 is-danger"
              @click="deleteProject(project.id)"
            >
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped></style>
