<template>
  <div class="border-t border-gray-300 dark:border-gray-700 py-5 px-5">
    <!-- form -->
    <div v-show="isOpen">
      <EnvironmentsEnvironmentForm
        @closeForm="isOpen = false"
        :environment="environment"
        label="Update"
      />
    </div>

    <!-- detail -->
    <div v-show="!isOpen" class="flex items-center gap-2">
      <div class="w-5/12 flex gap-2 items-center">
        <WorldIcon class="h-6 text-primary" />
        <p>{{ environment?.name }}</p>
        <UTooltip
          :text="environment?.description || 'No description available'"
        >
          <InfoCircleFilledIcon class="h-4" />
        </UTooltip>
      </div>
      <div class="w-5/12">
        <NuxtLink to="/" class="flex gap-1 items-center">
          <UIcon name="i-heroicons-arrow-top-right-on-square" />
          {{ environment?.url }}
        </NuxtLink>
      </div>
      <div class="w-2/12">
        <UToggle v-model="selected" />
      </div>
      <UButton variant="ghost" @click="isOpen = true">
        <UIcon name="i-heroicons-chevron-down" />
      </UButton>
    </div>
  </div>
</template>

<script setup>
import { WorldIcon, InfoCircleFilledIcon } from "vue-tabler-icons";
const selected = ref(false);
const props = defineProps(["environment"]);
const isOpen = ref(false);

const state = ref({
  name: props.environment?.name ?? "",
  url: props.environment?.url ?? "",
  description: props.environment?.description ?? "",
});

const submit = () => {
  //
};
</script>
