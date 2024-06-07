import http from "@/http";
import ITask from "@/interfaces/ITask";
import { State } from "@/store";
import { UPDATE_TASK, REGISTER_TASK, GET_TASKS } from "@/store/type-actions";
import { ADD_TASK, UPDATE_TASK as UPDATE_TASK_MUTATION, DEFINE_TASKS } from "@/store/type-mutations";
import { Module } from "vuex";

export interface TaskState{
  tasks: ITask[],
}

export const task: Module<TaskState, State> = {
  state: {
    tasks: [],
  },
  mutations:{
    [DEFINE_TASKS](state, tasks: ITask[]){
      state.tasks = tasks
    },

    [ADD_TASK](state, tasks: ITask){
      state.tasks.push(tasks)
    },
    [UPDATE_TASK_MUTATION](state, tasks: ITask) {
      const index = state.tasks.findIndex(t => t.id == tasks.id)
      state.tasks[index] = tasks
    },
  },

  actions:{
     [GET_TASKS]({ commit }, filter: string){
      let url ='tasks'

      if (filter) {
        url += '?description=' + filter
      }

      http.get(url).then(response => commit(DEFINE_TASKS, response.data))
    },
    [REGISTER_TASK]({commit}, task: ITask){
      return http.post('/tasks', task).then((response) => commit(ADD_TASK, response.data))
    },
    [UPDATE_TASK]({ commit }, task: ITask) {
      return http.put(`/tasks/${task.id}`, task)
        .then(() => commit(UPDATE_TASK_MUTATION, task))
    },
  }
}