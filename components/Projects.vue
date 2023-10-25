<template>
  <div class="mt-5 pb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
    <USkeleton
      v-show="store.isloading"
      v-for="item in [1, 2, 3, 4, 5]"
      class="h-32"
      :ui="{ rounded: 'rounded-md' }"
    />
    <Project
      v-show="!store.isloading"
      v-for="(project, index) in store.projects.items"
      :project="project"
      :key="index"
    />
  </div>
</template>

<script setup>
import { useStore } from "~/store";
import Project from "./Project.vue";
const store = useStore();

store.fetchProjects().then(() => store.updateLoadingStatus(false));
</script>
