<template>
  <Project>
    <div class="flex flex-col gap-10">
      <!-- details -->
      <div
        class="bg-slate-50 dark:bg-slate-900 border border-gray-300 dark:border-gray-700 rounded-md p-5"
      >
        <h1
          class="font-jakarta text-md font-medium text-black dark:text-white mb-5"
        >
          Project Details
        </h1>
        <NewProjectForm
          :initialData="store.getProject"
          :submitting="submitting"
          label="Update"
          @handleSubmit="(data) => handleSubmission(data)"
        />
      </div>
    </div>
  </Project>
</template>

<script setup lang="ts">
const toast = useToast();
import Project from "~/layouts/project.vue";
import { useStore } from "~/store";
const store = useStore();
const route = useRoute();
const { id } = route.params;
const submitting = ref(false);

store.fetchProject({ id });

const handleSubmission = (data: any) => {
  submitting.value = true;
  data = { ...data, id };
  const updateddata = toRaw(data);
  store.updateProject(updateddata).then(() => {
    submitting.value = false;
    toast.add({ title: "Project has been updated" });
  });
};

definePageMeta({
  layout: "dashboard",
});
</script>
