<template>
  <div
    class="bg-red-50 dark:bg-red-900 border border-red-300 dark:border-red-500 rounded-md py-5"
  >
    <h1
      class="font-jakarta text-md font-medium text-red-300 dark:text-red-600 mb-5 px-5"
    >
      Delete Details
    </h1>
    <hr class="border-red-300 dark:border-red-500" />
    <div class="mt-5 px-5">
      <p class="mb-5">
        The project will be permanently deleted. This action is irreversible and
        can not be undone.
      </p>

      <div>
        <UButton
          @click="isOpen = true"
          class="bg-red-500 hover:bg-red-500 dark:bg-red-600 dark:hover:bg-red-600"
          >Delete</UButton
        >
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
                  Delete Project
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
            <p>
              This project will be deleted, along with all of its Environments
              and Settings
            </p>
            <div
              class="my-5 bg-red-50 dark:bg-red-900 border border-red-300 dark:border-red-500 text-red-500 dark:text-red-500 text-sm rounded-md px-5 py-2"
            >
              Warning: This action is not reversible. Please be certain.
            </div>
            <p>Are you sure about you want to delete this project?</p>
            <template #footer>
              <div class="flex justify-between">
                <UButton @click="isOpen = false" variant="outline"
                  >Cancel</UButton
                >
                <UButton
                  colot="red"
                  :loading="submitting"
                  :disabled="submitting"
                  @click="handleDelete()"
                  class="bg-red-500 hover:bg-red-500 dark:bg-red-500 dark:hover:bg-red-500"
                  >Yes, continue</UButton
                >
              </div>
            </template>
          </UCard>
        </UModal>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "~/store";

const isOpen = ref(false);
const route = useRoute();
const router = useRouter();
const { id } = route.params;
const store = useStore();
const submitting = ref(false);
const toast = useToast();

const handleDelete = () => {
  submitting.value = true;
  store.deleteProject({ id }).then(() => {
    submitting.value = false;
    toast.add({ title: "Project has been deleted" });
    isOpen.value = false;
    router.push("/projects");
  });
};
</script>
