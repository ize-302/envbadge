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
        v-for="(environment, index) in environments"
        :key="index"
        :environment="environment"
      />

      <div
        v-show="!store.getLoadingStatus && environments.length === 0"
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
import type { IEnvironment, IProject } from "~/db/schema";
import Project from "~/layouts/project.vue";
import { useStore } from "~/store";
const store = useStore();
const isOpen = ref(false);
const route = useRoute();
const { id } = route.params;
const submitting = ref(false);
const toast = useToast();
const environments: any = ref([]);

onMounted(() => {
  store.fetchProject(Number(id));

  store.fetchEnvironments(Number(id)).then((result) => {
    environments.value = result;
    store.updateLoadingStatus(false);
  });
});

async function handleSubmission(data: IProject) {
  submitting.value = true;
  await store.saveEnvironment(Number(id), data).then(async () => {
    await store.fetchEnvironments(Number(id));
    isOpen.value = false;
    submitting.value = false;
    toast.add({ title: "Environment has been added" });
  });
}

definePageMeta({
  layout: "dashboard",
});
</script>
