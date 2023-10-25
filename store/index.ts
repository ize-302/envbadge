import { defineStore } from "pinia";

interface IState {
  projects: any;
  isloading: boolean;
  project: object | null;
}

export const useStore = defineStore("store", {
  state: (): IState => {
    return {
      projects: {},
      isloading: true,
      project: {},
    };
  },

  getters: {
    getProjects: (state) => state.projects,
    getLoadingStatus: (state) => state.isloading,
    getProject: (state) => state.project,
  },

  actions: {
    async fetchProjects() {
      const { data, error, pending, refresh } = await useFetch("/api/projects");
      this.projects = data.value;
    },
    async saveProject(values: any) {
      const { name, base_url } = values;
      await useFetch("/api/projects", {
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
    async fetchProject(values: any) {
      const { id } = values;
      const response = await useFetch(`/api/projects/${id}`, {
        method: "get",
      });
      this.project = response.data.value;
    },
    async deleteProject(values: any) {
      const { id } = values;
      await useFetch(`/api/projects/${id}`, {
        method: "delete",
      });
    },
    updateLoadingStatus(value: boolean) {
      this.isloading = value;
    },
  },
});
