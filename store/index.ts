import { defineStore } from "pinia";

interface IState {
  projects: any;
  isloading: boolean;
}

export const useStore = defineStore("store", {
  state: (): IState => {
    return {
      projects: {},
      isloading: true,
    };
  },

  getters: {
    getProjects: (state) => state.projects,
    getLoadingStatus: (state) => state.isloading,
  },

  actions: {
    async fetchProjects() {
      const { data, error, pending, refresh } = await useFetch("/api/projects");
      this.projects = data.value;
    },
    async saveProject(values: any) {
      const { name, base_url } = values;
      const response = await useFetch("/api/projects", {
        method: "post",
        body: { name, base_url },
      });
    },
    async updateProject(values: any) {
      const { name, base_url, id } = values;
      await useFetch(`/api/projects/${id}`, {
        method: "put",
        body: { name, base_url },
      });
    },
    updateLoadingStatus(value: boolean) {
      this.isloading = value;
    },
  },
});
