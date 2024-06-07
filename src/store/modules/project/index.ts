import http from "@/http";
import IProject from "@/interfaces/IProject";
import { State } from "@/store";
import { ALTER_PROJECT, REGISTER_PROJECT, GET_PROJECTS, REMOVE_PROJECT } from "@/store/type-actions";
import { ADD_PROJECT, UPDATE_PROJECT, DEFINE_PROJECTS, DELETE_PROJECT } from "@/store/type-mutations";
import { Module } from "vuex";

export interface ProjectState{
  projects: IProject[],
}

export const project: Module<ProjectState, State> = {
  mutations:{
    [ADD_PROJECT](state, projectName: string){
      const projeto = {
        id: new Date().toISOString(),
        name: projectName
      } as IProject
      state.projects.push(projeto)
    },
    [UPDATE_PROJECT](state, project: IProject){
      const index = state.projects.findIndex(proj => proj.id === project.id)

      state.projects[index] = project
    },
    [DELETE_PROJECT](state, id: string){
      state.projects = state.projects.filter(proj => proj.id != id)
    },
    [DEFINE_PROJECTS](state, projects: IProject[]){
      state.projects = projects
    },

  },

  actions:{
    [GET_PROJECTS]({ commit }){
      http.get('/projects').then(response => commit(DEFINE_PROJECTS, response.data))
    },
    [REGISTER_PROJECT](contexto, projectName: string){
      return http.post('/projects', {
        name: projectName,
        id: new Date().toISOString()
      })
    },
    [ALTER_PROJECT](contexto, project: IProject){
      return http.put(`/projects/${project.id}`, project)
    },
    [REMOVE_PROJECT]({commit}, id: string){
      return http.delete(`/projects/${id}`).then(() => commit(DEFINE_PROJECTS, id))
    },
  },

  getters: {
    projects (state) {
      return state.projects
    }
  }
}