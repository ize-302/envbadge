<template>
  <UForm
    class="flex flex-col gap-4"
    :validate="validate"
    :state="state"
    @submit="$emit('handleSubmit', state)"
  >
    <UFormGroup label="Project name" name="name">
      <UInput v-model="state.name" />
    </UFormGroup>

    <UFormGroup label="URL" name="base_url">
      <UInput v-model="state.base_url" />
    </UFormGroup>

    <UFormGroup>
      <UButton
        :loading="submitting"
        :disabled="submitting"
        type="submit"
        :label="label"
      />
    </UFormGroup>
  </UForm>
</template>

<script setup>
const props = defineProps(["submitting", "label", "initialData"]);
const state = ref({
  name: props.initialData.name || "",
  base_url: props.initialData.base_url || "",
});

const validate = (state) => {
  const errors = [];
  if (!state.name) errors.push({ path: "name", message: "Required" });
  if (!state.base_url) errors.push({ path: "base_url", message: "Required" });
  return errors;
};
</script>
