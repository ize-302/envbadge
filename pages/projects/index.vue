<template>
  <div class="mt-5 flex justify-between items-center">
    <NewProjectModal />
    <p class="text-slate-600 text-lg dark:text-white">Projects</p>
  </div>
  <div>
    <div class="mt-5 pb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <USkeleton
        v-show="store.getLoadingStatus"
        v-for="item in Array.apply(null, Array(5))"
        class="h-32"
        :ui="{ rounded: 'rounded-md' }"
      />
      <Project
        v-show="!store.getLoadingStatus"
        v-for="(project, index) in store.getProjects"
        :project="project"
        :key="index"
      />
    </div>
    <div
      v-show="!store.getLoadingStatus && store.getProjects.length === 0"
      class="my-10 flex flex-col justify-center items-center w-full gap-5 text-slate-400 dark:text-gray-600"
    >
      <ArchiveOffIcon
        class="text-slate-200 dark:text-gray-800"
        size="72"
        stroke-width="1"
      />
      You have no project yet!
    </div>
  </div>
</template>

<script setup lang="ts">
import NewProjectModal from "~/components/project/NewProjectModal.vue";
import { useStore } from "~/store";
import { ArchiveOffIcon } from "vue-tabler-icons";
const store = useStore();

store.fetchProjects().then(() => store.updateLoadingStatus(false));
definePageMeta({
  layout: "dashboard",
});
</script>
