import TaskView from "@/views/TaskView.vue";
import ProjectsView from "@/views/ProjectsView.vue";
import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import FormProjects from "@/views/Projects/FormProjects.vue";
import ProjectsList from "@/views/Projects/ProjectsList.vue";

const rotas: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Tasks",
    component: TaskView,
  },
  {
    path: "/projects",
    component: ProjectsView,
    children: [
      {
        path: "",
        name: "Projects",
        component: ProjectsList,
      },
      {
        path: "new",
        name: "new Project",
        component: FormProjects,
      },
      {
        path: ":id",
        name: "Edit Project",
        component: FormProjects,
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: rotas,
});

export default router;
