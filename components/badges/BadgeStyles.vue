<template>
  <div class="mt-10">
    <h1
      class="font-jakarta text-md font-medium text-slate-500 dark:text-slate-500 mb-5"
    >
      Badge style
    </h1>
    <div class="mt-5 pb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <label
        :class="`border rounded-md p-4 shadow-sm relative cursor-pointer ${
          selected_badge_style === badge.value
            ? 'border-primary'
            : 'border-slate-100 dark:border-slate-800'
        }`"
        v-for="badge in badge_styles"
        :key="badge.value"
        :for="badge.value"
      >
        <URadio
          v-model="selected_badge_style"
          v-bind="badge"
          :id="badge.value"
          class="hidden"
          :disabled="badge.disabled"
        />
        <p
          :class="`capitalize ${badge.disabled ? 'opacity-50' : 'opacity-100'}`"
        >
          {{ badge.label }}
        </p>
      </label>
    </div>
    <h1
      class="font-jakarta text-md font-medium text-slate-500 dark:text-slate-500 mb-5 mt-5"
    >
      Badge position
    </h1>
    <div class="flex gap-10">
      <USelect
        size="md"
        placeholder="Select..."
        v-model="selected_badge_position"
        :options="
          badge_position_options.map((item) => {
            return { name: item, value: item };
          })
        "
        option-attribute="name"
      />
    </div>

    <UButton
      :disabled="submitting"
      :loading="submitting"
      @click="handleSubmit()"
      class="mt-10"
      size="lg"
      >Update</UButton
    >
  </div>
</template>

<script setup>
import { useStore } from "~/store";
const store = useStore();
const route = useRoute();
const toast = useToast();
const { id } = route.params;
const submitting = ref(false);
const badge_styles = [
  {
    value: "default",
    label: "default",
  },
  {
    value: "banner",
    label: "banner",
  },
  {
    value: "watermark",
    label: "watermark",
  },
];

let badge_position_options = ref([]);
const selected_badge_style = ref("");
const selected_badge_position = ref("");

const handleSwitch = (the_badge_style) => {
  const position_options1 = [
    "top",
    "top-left",
    "top-right",
    "bottom",
    "bottom-left",
    "bottom-right",
  ];
  const position_options2 = ["top", "bottom"];
  selected_badge_style.value = the_badge_style;
  selected_badge_position.value = store.getProject.badge_position;
  if (["default", "watermark"].includes(the_badge_style)) {
    if (!position_options1.includes(selected_badge_position.value)) {
      selected_badge_position.value = badge_position_options.value[0];
    }
    badge_position_options.value = position_options1;
  } else if (the_badge_style === "banner") {
    if (!position_options2.includes(selected_badge_position.value)) {
      selected_badge_position.value = badge_position_options.value[0];
    }
    badge_position_options.value = position_options2;
  }
};

onMounted(() => {
  handleSwitch(store.getProject.badge_style);
});

// watch for changes
watch(selected_badge_style, (newX) => {
  handleSwitch(newX);
});

const handleSubmit = () => {
  console.log(selected_badge_style.value);
  console.log(selected_badge_position.value);
  submitting.value = true;
  const data = {
    badge_position: selected_badge_position.value,
    badge_style: selected_badge_style.value,
    id: id,
  };
  const updateddata = toRaw(data);
  store.updateProject(updateddata).then(() => {
    submitting.value = false;
    toast.add({ title: "Badge has been updated" });
  });
};

store.fetchProject(id.toString());
</script>
