import { defineStore } from "pinia";

interface IState {
  projects: any;
  isloading: boolean;
  project: object | null;
  environments: any;
}

export const useStore = defineStore("store", {
  state: (): IState => {
    return {
      projects: [],
      isloading: true,
      project: {},
      environments: [],
    };
  },

  getters: {
    // projects
    getProjects: (state) => state.projects,
    getLoadingStatus: (state) => state.isloading,
    getProject: (state) => state.project,
    // environments
    getEnvironments: (state) => state.environments,
  },

  actions: {
    // projects
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
    // environments
    async fetchEnvironments(project_id: string) {
      const { data, error, pending, refresh } = await useFetch(
        `/api/environments?project_id=${project_id}`
      );
      this.environments = data.value;
    },
    async saveEnvironment(project_id: string, values: any) {
      const { name, url, description } = values;
      const { data, error, pending, refresh } = await useFetch(
        `/api/environments?project_id=${project_id}`,
        {
          method: "post",
          body: { name, url, description },
        }
      );
    },
    async updateEnvironment(project_id: string, payload: any) {
      await useFetch(
        `/api/environments?project_id=${project_id}&environment_id=${payload.id}`,
        {
          method: "put",
          body: payload,
        }
      );
    },
    async deleteEnvironment(environment_id: string) {
      await useFetch(`/api/environments?environment_id=${environment_id}`, {
        method: "delete",
      });
    },
    // misc
    updateLoadingStatus(value: boolean) {
      this.isloading = value;
    },
  },
});
