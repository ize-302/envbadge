import { defineStore } from "pinia";

interface IState {
  projects: any;
}

export const useStore = defineStore("store", {
  state: (): IState => {
    return {
      projects: [],
    };
  },

  getters: {
    getProjects: (state) => state.projects,
  },

  actions: {
    saveProject(value: string) {},
  },
});
