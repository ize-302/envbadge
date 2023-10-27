<template>
  <Project>
    <div class="flex flex-col gap-10">
      <!-- details -->
      <div
        class="bg-slate-50 dark:bg-transparent border border-gray-300 dark:border-gray-700 rounded-md py-5"
      >
        <h1
          class="font-jakarta text-md font-medium text-slate-500 dark:text-slate-500 mb-5 px-5"
        >
          Project Details
        </h1>
        <hr class="border-gray-300 dark:border-gray-700" />
        <div class="px-5 pt-5">
          <NewProjectForm
            :initialData="store.getProject"
            :submitting="submitting"
            label="Update"
            @handleSubmit="(data) => handleSubmission(data)"
          />
        </div>
      </div>
      <!-- delete -->
      <DeleteProject />
    </div>
  </Project>
</template>

<script setup lang="ts">
import NewProjectForm from "~/components/project/NewProjectForm.vue";
import DeleteProject from "~/components/project/DeleteProject.vue";

const toast = useToast();
import Project from "~/layouts/project.vue";
import { useStore } from "~/store";
import type { IProject } from "~/db/schema";
const store = useStore();
const route = useRoute();
const { id } = route.params;
const submitting = ref(false);

store.fetchProject(Number(id));

const handleSubmission = (data: IProject) => {
  submitting.value = true;
  data = { ...data, id: Number(id) };
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
