<template>
  <div class="mt-5 pb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
    <div
      v-for="(project, index) in projects"
      :key="index"
      class="border border-gray-300 flex flex-col gap-2 dark:border-gray-700 rounded-md p-4 shadow-sm"
    >
      <p class="text-slate-600 text-lg dark:text-white">EnvBadge</p>
      <NuxtLink to="/" class="text-primary underline">3 environments</NuxtLink>
      <p class="text-slate-400">Last updated a week ago</p>
    </div>
  </div>
</template>

<script setup>
const projects = [1, 2, 3, 4, 5];
</script>
