<template>
  <NuxtLink
    :to="`/projects/${project.id}`"
    class="border border-gray-300 flex flex-col gap-2 dark:border-gray-700 rounded-md p-4 shadow-sm hover:bg-gray-100 hover:dark:bg-black/10"
  >
    <p class="text-slate-600 text-2xl dark:text-white">{{ project.name }}</p>
    <p class="text-primary/50">
      <b>{{ project.environment_count }}</b>
      {{ pluralize("environment", project?.environment_count) }}
    </p>
  </NuxtLink>
</template>

<script setup>
import { pluralize } from "~/utils";
const props = defineProps(["project"]);
</script>
