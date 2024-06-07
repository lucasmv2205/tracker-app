import INotification from "@/interfaces/INotification";
import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore } from "vuex";
import { NOTIFY } from "./type-mutations";
import { ProjectState, project } from "./modules/project";
import { TaskState, task } from "./modules/task";

export interface State{
  notifications: INotification[],
  project: ProjectState,
  task: TaskState,
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state:{
    notifications:[],
    project:{
      projects:[]
    },
    task:{
      tasks:[]
    }
  },
  mutations:{
    [NOTIFY](state, newNotification: INotification){
      newNotification.id = new Date().getTime()
      state.notifications.push(newNotification)

      setTimeout(() => {
        state.notifications = state.notifications.filter(notification => notification.id !== newNotification.id)
      }, 3000)
    },
  },

  modules:{
    project,
    task
  }
})

export function useStore(): Store<State>{
  return vuexUseStore(key)
}