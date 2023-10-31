import { defineStore } from "pinia";
import type { IEnvironment, IProject } from "~/db/schema";
interface IState {
  projects: any;
  isloading: boolean;
  project: object | null;
}

export const useStore = defineStore("store", {
  state: (): IState => {
    return {
      projects: [],
      isloading: true,
      project: {},
    };
  },

  getters: {
    // projects
    getProjects: (state) => state.projects,
    getLoadingStatus: (state) => state.isloading,
    getProject: (state) => state.project,
  },

  actions: {
    // projects
    async fetchProjects() {
      const { data, error, pending, refresh } = await useFetch("/api/projects");
      this.projects = data.value;
    },
    async saveProject(values: IProject) {
      const { name } = values;
      await useFetch("/api/projects", {
        method: "post",
        body: { name },
      });
    },
    async updateProject(values: IProject) {
      const { name, id } = values;
      await useFetch(`/api/projects/${id}`, {
        method: "put",
        body: { name },
      });
    },
    async fetchProject(id: string) {
      const response = await useFetch(`/api/projects/${id}`, {
        method: "get",
      });
      this.project = response.data.value;
    },
    async deleteProject(id: string) {
      await useFetch(`/api/projects/${id}`, {
        method: "delete",
      });
    },
    // environments
    async fetchEnvironments(project_id: string) {
      this.isloading = true;
      const { data, error, pending, refresh } = await useFetch(
        `/api/environments?project_id=${project_id}`
      );
      return data.value;
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
    async updateEnvironment(project_id: string, payload: IEnvironment) {
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
