<template>
  <Project>
    <div
      class="bg-slate-50 dark:bg-transparent border border-gray-300 dark:border-gray-700 rounded-md pt-5"
    >
      <div class="flex justify-between items-center mb-5 px-5">
        <h1
          class="font-jakarta text-md font-medium text-slate-500 dark:text-slate-500"
        >
          Environments
        </h1>
      </div>
      <hr class="border-gray-300 dark:border-gray-700" />
      <div class="p-5">
        <UButton v-show="!isOpen" @click="isOpen = true"
          >Add environment</UButton
        >
        <div class="flex flex-col gap-4" v-show="isOpen">
          <h1>New environment</h1>
          <EnvironmentsEnvironmentForm
            :state="{}"
            @closeForm="isOpen = false"
            label="Add"
          />
        </div>
      </div>
      <Environment
        v-for="environment in environments"
        :environment="environment"
      />
    </div>
  </Project>
</template>

<script setup lang="ts">
import Environment from "~/components/environments/Environment.vue";
import Project from "~/layouts/project.vue";
const isOpen = ref(false);

const environments = [
  {
    name: "development",
    url: "dev.envbadge.io",
  },
  {
    name: "test",
    url: "test.envbadge.io",
  },
  {
    name: "staging",
    url: "staging.envbadge.io",
  },
  {
    name: "demo",
    url: "demo.envbadge.io",
  },
];

definePageMeta({
  layout: "dashboard",
});
</script>
