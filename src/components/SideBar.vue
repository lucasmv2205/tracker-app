<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "SideBar",

  data() {
    return {
      darkMode: false,
    };
  },

  methods: {
    handleChangeTheme() {
      this.darkMode = !this.darkMode;
      this.$emit("changeTheme", this.darkMode);
    },
  },

  computed: {
    text(): string {
      return this.darkMode ? "deactivate" : "activate";
    },
  },

  emits: ["changeTheme"],
});
</script>

<template>
  <header class="">
    <div class="has-text-centered">
      <button @click="handleChangeTheme" class="button">
        {{ text }} dark mode
      </button>
    </div>

    <nav class="panel mt-5">
      <ul>
        <li>
          <router-link class="link" to="/">
            <i class="fas fa-tasks"></i>
            tasks
          </router-link>
        </li>
        <li>
          <router-link class="link" to="/projects">
            <i class="fas fa-project-diagram"></i>
            projects
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  text-align: center;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}

.panel li {
  margin: 8px 0;
}

.link {
  color: #fff;
}

.link:hover {
  color: #faf0ca;
}

.link.router-link-active {
  color: #faf0ca;
}
</style>
