<template>
  <div class="flex w-full mt-5 gap-10">
    <UVerticalNavigation class="w-2/12 flex flex-col" :links="links" />
    <slot />
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
  },
  {
    label: "Environments",
    icon: "i-heroicons-globe-alt",
    to: `/projects/${id}`,
  },
  {
    label: "Settings",
    icon: "i-heroicons-cog-6-tooth",
    to: `/projects/${id}/settings`,
  },
];
</script>
