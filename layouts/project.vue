<template>
  <div class="flex w-full mt-5 gap-10">
    <UVerticalNavigation class="min-w-[220px] flex flex-col" :links="links" />
    <div class="w-full">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { id } = route.params;

useHead({
  titleTemplate: "EnvBadge",
});

const links = [
  {
    label: "Back",
    icon: "i-heroicons-arrow-small-left",
    to: "/projects",
    class: "!py-2 mb-2",
  },
  {
    label: "Environments",
    icon: "i-heroicons-globe-alt",
    to: `/projects/${id}`,
    class: "!py-2",
  },
  {
    label: "Settings",
    icon: "i-heroicons-cog-6-tooth",
    to: `/projects/${id}/settings`,
    class: "!py-2",
  },
  {
    label: "Setup",
    icon: "i-heroicons-wrench-screwdriver",
    to: `/projects/${id}/setup`,
    class: "!py-2",
  },
];
</script>
