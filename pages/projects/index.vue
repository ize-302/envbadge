<template>
  <div class="mt-5 flex justify-between items-center">
    <NewProjectModal />
    <p class="text-slate-600 text-lg dark:text-white">Projects</p>
  </div>
  <div class="">
    <Projects />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});
</script>
