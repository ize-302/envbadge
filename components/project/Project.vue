<template>
  <NuxtLink
    :to="`/projects/${project.id}`"
    class="border border-gray-300 flex flex-col gap-2 dark:border-gray-700 rounded-md p-4 shadow-sm hover:bg-gray-100 hover:dark:bg-black/10"
  >
    <p class="text-slate-600 text-lg dark:text-white">{{ project.name }}</p>
    <p class="text-primary underline">3 environments</p>
    <p class="text-slate-400">Last updated a week ago</p>
  </NuxtLink>
</template>

<script setup>
const props = defineProps(["project"]);
</script>
