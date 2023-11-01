<template>
  <div class="text-[#0f3254] dark:text-gray-300">
    <div class="container mx-auto max-w-5xl px-5">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const description = ref("My amazing site.");

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - EnvBadge` : "EnvBadge";
  },
  script: [
    {
      src: "https://cdn.jsdelivr.net/npm/envbadge-js@v0.0.3/script.js?projectId=29fb7f42-3869-42ec-ad5d-52f75c7e3b04",
      body: false,
    },
  ],
  link: [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossorigin: "",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,700&display=swap",
      crossorigin: "",
    },
  ],
});
</script>
