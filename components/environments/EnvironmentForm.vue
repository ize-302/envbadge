<template>
  <UForm :state="environment" @submit="submit" class="flex flex-col gap-4">
    <div class="flex justify-between gap-4">
      <UFormGroup class="w-1/2" label="Name" name="name">
        <UInput v-model="state.name" />
      </UFormGroup>
      <UFormGroup class="w-1/2" label="URL" name="url">
        <UInput v-model="state.url" />
      </UFormGroup>
    </div>
    <UFormGroup label="Description" name="description">
      <UTextarea v-model="state.description" />
    </UFormGroup>
    <div class="flex justify-end gap-4">
      <UButton variant="outline" @click="$emit('closeForm')">Close</UButton>
      <UButton type="submit">{{ label }}</UButton>
    </div>
  </UForm>
</template>

<script setup>
const props = defineProps(["environment", "label"]);

const state = ref({
  name: props.environment?.name ?? "",
  url: props.environment?.url ?? "",
  description: props.environment?.description ?? "",
});

const submit = () => {
  //
};
</script>
