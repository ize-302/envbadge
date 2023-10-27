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
      <div class="p-5 border-b border-gray-300 dark:border-gray-700">
        <UButton v-show="!isOpen" @click="isOpen = true"
          >Add environment</UButton
        >
        <div class="flex flex-col gap-4" v-show="isOpen">
          <h1>New environment</h1>
          <EnvironmentsEnvironmentForm
            :environment="{}"
            @closeForm="isOpen = false"
            label="Add"
            @handleSubmit="(data) => handleSubmission(data)"
            :submitting="submitting"
          />
        </div>
      </div>
      <Environment
        v-for="(environment, index) in store.getEnvironments"
        :key="index"
        :environment="environment"
      />

      <div
        v-show="!store.getLoadingStatus && store.getEnvironments.length === 0"
        class="pt-10 mb-10 flex flex-col justify-center items-center w-full gap-5 text-slate-400 dark:text-gray-600"
      >
        <ArchiveOffIcon
          class="text-slate-200 dark:text-gray-800"
          size="72"
          stroke-width="1"
        />
        You have no environment yet!
      </div>
    </div>
  </Project>
</template>

<script setup lang="ts">
import { ArchiveOffIcon } from "vue-tabler-icons";
import Environment from "~/components/environments/Environment.vue";
import type { IProject } from "~/db/schema";
import Project from "~/layouts/project.vue";
import { useStore } from "~/store";
const store = useStore();
const isOpen = ref(false);
const route = useRoute();
const { id } = route.params;
const submitting = ref(false);
const toast = useToast();

store
  .fetchEnvironments(id as string)
  .then(() => store.updateLoadingStatus(false));

async function handleSubmission(data: IProject) {
  submitting.value = true;
  await store.saveEnvironment(id as string, data).then(async () => {
    isOpen.value = false;
    await store.fetchEnvironments(id as string);
    submitting.value = false;
    toast.add({ title: "Environment has been added" });
  });
}

definePageMeta({
  layout: "dashboard",
});
</script>
