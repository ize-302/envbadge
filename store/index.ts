import { defineStore } from "pinia";

interface IState {
  accessToken: string;
  currentUser: any;
}

export const useStore = defineStore("store", {
  state: (): IState => {
    return {
      accessToken: "",
      currentUser: null,
    };
  },

  getters: {
    getToken: (state) => state.accessToken,
    getUser: (state) => state.currentUser,
  },

  actions: {
    saveToken(value: string) {
      this.accessToken = value;
    },
    updateCurrentUser(value: any) {
      this.currentUser = value;
    },
    async fetchCurrentUser() {
      const user = await $fetch(
        `/api/user?accessToken=${this.$state.accessToken}`
      );
      this.updateCurrentUser(user);
      return user;
    },
    logout() {
      this.$reset();
    },
  },

  persist: {
    storage: persistedState.localStorage,
  },
});
