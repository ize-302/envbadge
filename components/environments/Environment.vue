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
          <UTooltip
            :popper="{ placement: 'top' }"
            :text="environment?.description || 'No description available'"
          >
            <InfoCircleIcon class="h-4 text-gray-400" />
          </UTooltip>
          <p class="truncate overflow-hidden">{{ environment?.name }}</p>
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
import { WorldIcon, InfoCircleIcon } from "vue-tabler-icons";
import { useStore } from "~/store";
const props = defineProps(["environment"]);
const selected = ref(props.environment.show_badge);
const isOpen = ref(false);
const submitting = ref(false);
const deleting = ref(false);
const route = useRoute();
const { id } = route.params;
const store = useStore();
const emit = defineEmits();

watch(selected, () => {
  store.updateEnvironment(id, {
    ...props.environment,
    show_badge: selected.value,
  });
});

async function handleDeleteEnvironment(data) {
  deleting.value = true;
  await store.deleteEnvironment(data).then(async () => {
    isOpen.value = false;
    deleting.value = false;
    emit("refresh");
    toast.add({ title: "Environment has been deleted" });
  });
}

async function handleUpdateEnvironment(data) {
  submitting.value = true;
  await store.updateEnvironment(id, data).then(async () => {
    isOpen.value = false;
    submitting.value = false;
    emit("refresh");
    toast.add({ title: "Environment has been updatd" });
  });
}
</script>
