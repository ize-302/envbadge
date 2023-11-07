<template>
  <UForm
    class="flex flex-col gap-4"
    :validate="validate"
    :state="state"
    @submit="$emit('handleSubmit', state)"
  >
    <div class="flex justify-between gap-4">
      <UFormGroup class="w-1/2" label="Name" name="name">
        <UInput v-model="state.name" />
      </UFormGroup>
      <UFormGroup class="w-1/2" name="url">
        <div
          class="text-sm flex items-center font-medium text-gray-700 dark:text-gray-200 mb-1"
        >
          URL
          <span>
            <UTooltip
              :popper="{ placement: 'right' }"
              text="Url should be without http://, https://, www."
            >
              <InfoCircleFilledIcon class="h-4" />
            </UTooltip>
          </span>
        </div>
        <UInput v-model="state.url" />
      </UFormGroup>
    </div>

    <UFormGroup label="Description" name="description">
      <UTextarea v-model="state.description" />
    </UFormGroup>
    <div class="flex justify-between">
      <UButton
        :loading="deleting"
        :disabled="deleting"
        v-if="props.environment?.name"
        color="red"
        @click="$emit('handleDelete', props.environment.id)"
        >Delete</UButton
      >
      <div></div>

      <div class="flex justify-end gap-4">
        <UButton variant="outline" @click="$emit('closeForm')">Close</UButton>
        <UButton :loading="submitting" :disabled="submitting" type="submit">{{
          label
        }}</UButton>
      </div>
    </div>
  </UForm>
</template>

<script setup>
const props = defineProps(["environment", "label", "submitting", "deleting"]);
import { InfoCircleFilledIcon } from "vue-tabler-icons";

const state = ref({
  ...props.environment,
  name: props.environment?.name || "",
  url: props.environment?.url || "",
  description: props.environment?.description || "",
});

const validate = (state) => {
  const errors = [];
  if (!state.name) errors.push({ path: "name", message: "Required" });
  if (!state.url) errors.push({ path: "url", message: "Required" });
  return errors;
};
</script>
