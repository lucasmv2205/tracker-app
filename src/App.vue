<script lang="ts">
import { defineComponent } from "vue";
import SideBar from "./components/SideBar.vue";
import NotificationsApp from "./components/NotificationsApp.vue";

export default defineComponent({
  name: "App",
  components: { SideBar, NotificationsApp },
  data() {
    return {
      darkTheme: false,
    };
  },

  methods: {
    handleChangeTheme(darkMode: boolean) {
      this.darkTheme = darkMode;
    },
  },
});
</script>

<template>
  <main
    class="columns is-gapless is-multiline"
    :class="{ 'dark-theme': darkTheme }"
  >
    <div class="column is-one-quarter">
      <SideBar @changeTheme="handleChangeTheme" />
    </div>
    <div class="column is-three-quarter conteudo">
      <NotificationsApp />
      <RouterView />
    </div>
  </main>
</template>

<style>
main {
  --bg-primario: #fff;
  --texto-primario: #000;
}
main.dark-theme {
  --bg-primario: #2b2d42;
  --texto-primario: #ddd;
}
.conteudo {
  background-color: var(--bg-primario);
  color: var(--texto-primario);
}
</style>
