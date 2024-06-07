<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "@/store";
import { NotificationType } from "@/interfaces/INotification";

import useNotifier from "@/hooks/notifier";
import { ALTER_PROJECT, REGISTER_PROJECT } from "@/store/type-actions";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "FormProjects",
  // data() {
  //   return {
  //     projectName: "",
  //   };
  // },
  props: {
    id: { type: String, required: false },
  },

  // mounted() {
  //   if (this.id) {
  //     const projeto = this.store.state.projeto.projetos.find(
  //       (proj) => proj.id === this.id
  //     );
  //     this.projectName = projeto?.nome || "";
  //   }
  // },

  // methods: {
  // save() {
  //   if (this.id) {
  //     this.store
  //       .dispatch(ALTERAR_PROJETO, {
  //         id: this.id,
  //         nome: this.projectName,
  //       })
  //       .then(() => this.handleSuccess());
  //   } else {
  //     this.store.dispatch(CADASTRAR_PROJETO, this.projectName).then(() => {
  //       this.handleSuccess();
  //     });
  //   }
  // },
  // handleSuccess() {
  //   this.projectName = "";
  //   this.notificar(
  //     TipoNotificacao.SUCESSO,
  //     "Excelente",
  //     "Projeto cadastrado com sucesso"
  //   );
  //   this.$router.push("/projetos");
  // },
  // },

  setup(props) {
    const router = useRouter();
    const store = useStore();
    const { notify } = useNotifier();

    const projectName = ref("");

    if (props.id) {
      const project = store.state.project.projects.find(
        (proj) => proj.id === props.id
      );
      projectName.value = project?.name || "";
    }

    const handleSuccess = () => {
      projectName.value = "";
      notify(
        NotificationType.SUCCESS,
        "Excelente",
        "Projeto cadastrado com sucesso"
      );
      router.push("/projects");
    };

    const save = () => {
      if (props.id) {
        store
          .dispatch(ALTER_PROJECT, {
            id: props.id,
            name: projectName.value,
          })
          .then(() => handleSuccess());
      } else {
        store.dispatch(REGISTER_PROJECT, projectName.value).then(() => {
          handleSuccess();
        });
      }
    };

    return {
      // store,
      // notificar,
      projectName,
      save,
    };
  },
});
</script>

<template>
  <form @submit.prevent="save">
    <div class="field">
      <label class="label" for="projectName">Project name</label>
      <input type="text" class="input" v-model="projectName" id="projectName" />
    </div>
    <div class="field">
      <button type="submit" class="button">save</button>
    </div>
  </form>
</template>

<style scoped></style>
