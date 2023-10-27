<template>
  <div class="border-t border-gray-300 dark:border-gray-700 py-5 px-5">
    <!-- form -->
    <div v-show="isOpen">
      <EnvironmentsEnvironmentForm
        @closeForm="isOpen = false"
        @handleSubmit="(data) => handleUpdateEnvironment(data)"
        :environment="environment"
        label="Update"
        :submitting="submitting"
        :deleting="deleting"
        @handleDelete="(data) => handleDeleteEnvironment(data)"
      />
    </div>

    <!-- detail -->
    <div v-show="!isOpen" class="flex items-center gap-2">
      <div class="w-5/12 flex gap-2 items-center">
        <WorldIcon class="h-6 text-primary" />
        <div class="flex items-center truncate overflow-hidden">
          <p class="truncate overflow-hidden">{{ environment?.name }}</p>
          <UTooltip
            :text="environment?.description || 'No description available'"
          >
            <InfoCircleFilledIcon class="h-4" />
          </UTooltip>
        </div>
      </div>
      <div class="w-5/12">
        <NuxtLink to="/" class="flex gap-1 items-center">
          <UIcon name="i-heroicons-arrow-top-right-on-square" />
          {{ environment?.url }}
        </NuxtLink>
      </div>
      <div class="w-2/12">
        <UToggle
          on-icon="i-heroicons-check-20-solid"
          off-icon="i-heroicons-x-mark-20-solid"
          v-model="selected"
        />
      </div>
      <UButton variant="ghost" @click="isOpen = true">
        <UIcon name="i-heroicons-chevron-down" />
      </UButton>
    </div>
  </div>
</template>

<script setup>
const toast = useToast();
import { WorldIcon, InfoCircleFilledIcon } from "vue-tabler-icons";
import { useStore } from "~/store";
const props = defineProps(["environment"]);
const selected = ref(props.environment.show_badge);
const isOpen = ref(false);
const submitting = ref(false);
const deleting = ref(false);
const route = useRoute();
const { id } = route.params;
const store = useStore();

watch(selected, () => {
  store.updateEnvironment(id, {
    ...props.environment,
    show_badge: selected.value,
  });
});

async function handleDeleteEnvironment(data) {
  deleting.value = true;
  store.deleteEnvironment(data).then(() => {
    isOpen.value = false;
    store.fetchEnvironments(id);
    deleting.value = false;
  });
}

async function handleUpdateEnvironment(data) {
  submitting.value = true;
  await store.updateEnvironment(id, data).then(async () => {
    await store.fetchEnvironments(id);
    submitting.value = false;
    toast.add({ title: "Environment has been updatd" });
    isOpen.value = false;
  });
}
</script>
