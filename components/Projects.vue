<template>
  <div class="mt-5 pb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
    <USkeleton
      v-show="store.getLoadingStatus"
      v-for="item in [1, 2, 3, 4, 5]"
      class="h-32"
      :ui="{ rounded: 'rounded-md' }"
    />
    <Project
      v-show="!store.getLoadingStatus"
      v-for="(project, index) in store.getProjects.items"
      :project="project"
      :key="index"
    />
  </div>
  <div
    v-show="!store.getLoadingStatus && store.getProjects.items.length === 0"
    class="my-10 flex flex-col justify-center items-center w-full gap-5 text-slate-400 dark:text-gray-600"
  >
    <ArchiveOffIcon
      class="text-slate-200 dark:text-gray-800"
      size="72"
      stroke-width="1"
    />
    You have no project yet!
  </div>
</template>

<script setup>
import { useStore } from "~/store";
import Project from "./Project.vue";
import { ArchiveOffIcon, TrashIcon } from "vue-tabler-icons";
const store = useStore();

store.fetchProjects().then(() => store.updateLoadingStatus(false));
</script>
