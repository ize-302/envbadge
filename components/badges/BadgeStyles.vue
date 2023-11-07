<template>
  <div class="mt-10">
    <UForm
      :validate="validate"
      :state="state"
      class="flex flex-col gap-5"
      @submit="handleSubmit(state)"
    >
      <UFormGroup name="custom_message" label="Custom message" class="w-3/4">
        <UInput
          v-model="state.custom_message"
          placeholder="You are viewing {{environment}} mode"
        />
      </UFormGroup>
      <UFormGroup name="badge_style" label=" Badge style">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <label
            :class="`border rounded-md p-4 shadow-sm relative cursor-pointer ${
              state.badge_style === badge.value
                ? 'border-primary'
                : 'border-slate-100 dark:border-slate-800'
            }`"
            v-for="badge in badge_styles.map((item) => {
              return { label: item, value: item };
            })"
            :key="badge.value"
            :for="badge.value"
          >
            <URadio
              v-model="state.badge_style"
              v-bind="badge"
              :id="badge.value"
              class="hidden"
              :disabled="badge.disabled"
            />
            <p
              :class="`capitalize ${
                badge.disabled ? 'opacity-50' : 'opacity-100'
              }`"
            >
              {{ badge.label }}
            </p>
          </label>
        </div>
      </UFormGroup>
      <UFormGroup name="badge_position" label="Badge position" class="w-1/4">
        <USelect
          size="md"
          placeholder="Select..."
          v-model="state.badge_position"
          :options="
            position_options.map((item) => {
              return { name: item, value: item };
            })
          "
          option-attribute="name"
        />
      </UFormGroup>

      <div>
        <UButton
          :disabled="submitting"
          :loading="submitting"
          type="'submit'"
          size="lg"
          >Update</UButton
        >
      </div>
    </UForm>
  </div>
</template>

<script setup>
import { useStore } from "~/store";
const store = useStore();
const route = useRoute();
const toast = useToast();
const { id } = route.params;
const submitting = ref(false);
const badge_styles = ["default", "watermark"];
const position_options = [
  "top",
  "top-left",
  "top-right",
  "bottom",
  "bottom-left",
  "bottom-right",
];

const state = ref({
  badge_style: store.getProject.badge_style,
  badge_position: store.getProject.badge_position,
  custom_message: store.getProject.custom_message,
});

const validate = (state) => {
  const errors = [];
  if (!state.badge_style)
    errors.push({ path: "badge_style", message: "Required" });
  if (!state.badge_position)
    errors.push({ path: "badge_position", message: "Required" });
  if (!state.custom_message)
    errors.push({ path: "custom_message", message: "Required" });
  return errors;
};

const handleSubmit = (state) => {
  submitting.value = true;
  const data = {
    badge_position: state.badge_position,
    badge_style: state.badge_style,
    custom_message: state.custom_message,
    id: id,
  };
  store.updateProject(data).then(() => {
    submitting.value = false;
    toast.add({ title: "Badge has been updated" });
  });
};
</script>
