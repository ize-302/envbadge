<template>
  <div>
    <UButton label="New Project" @click="isOpen = true" />

    <UModal v-model="isOpen">
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              New Project
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>
        </template>
        <NewProjectForm
          :initialData="{}"
          :submitting="submitting"
          label="Create"
          @handleSubmit="(data) => handleSubmission(data)"
        />
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
import NewProjectForm from "~/components/project/NewProjectForm.vue";

const toast = useToast();
const isOpen = ref(false);
import { useStore } from "~/store";
const store = useStore();
const submitting = ref(false);

const state = ref({});

const validate = (state) => {
  const errors = [];
  if (!state.name) errors.push({ path: "name", message: "Required" });
  if (!state.base_url) errors.push({ path: "base_url", message: "Required" });
  return errors;
};

async function handleSubmission(data) {
  submitting.value = true;
  store.saveProject(data).then(() => {
    isOpen.value = false;
    store.fetchProjects();
    submitting.value = false;
    toast.add({ title: "Project has been added" });
    state.value = {};
  });
}
</script>
