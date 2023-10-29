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
});

const validate = (state) => {
  const errors = [];
  if (!state.name) errors.push({ path: "name", message: "Required" });
  return errors;
};
</script>
