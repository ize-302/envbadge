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

        <UForm
          class="flex flex-col gap-4"
          :validate="validate"
          :state="state"
          @submit="submit"
        >
          <UFormGroup label="Project name" name="name">
            <UInput v-model="state.name" />
          </UFormGroup>

          <UFormGroup label="URL" name="base_url">
            <UInput v-model="state.base_url" />
          </UFormGroup>

          <UFormGroup>
            <UButton type="submit" label="Create" />
          </UFormGroup>
        </UForm>
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
const toast = useToast();
const isOpen = ref(false);
import { useStore } from "~/store";
const store = useStore();

const state = ref({
  name: "",
  base_url: "",
});

const validate = (state) => {
  const errors = [];
  if (!state.name) errors.push({ path: "name", message: "Required" });
  if (!state.base_url) errors.push({ path: "base_url", message: "Required" });
  return errors;
};

async function submit(event) {
  store.saveProject(event.data).then(() => {
    isOpen.value = false;
    store.fetchProjects();
    toast.add({ title: "Project has been added" });
  });
}
</script>
