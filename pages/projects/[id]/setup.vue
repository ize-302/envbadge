<template>
  <Project>
    <h1 class="text-md font-medium text-slate-500 dark:text-slate-500 mb-5">
      Setup
    </h1>

    <ol class="list-decimal pl-5">
      <li class="mb-2">
        Add the appropriate environments here
        <NuxtLink :to="'/projects/' + id" class="text-primary underline">
          here
        </NuxtLink>
      </li>
      <li>
        Copy and paste this in your html file just before the closing
        &lt;/body&gt; tag
        <pre><code class="lang-js"><span> &lt;script src='https://cdn.jsdelivr.net/npm/envbadge-js@v0.0.4/script.js?projectId={{ id }}'&gt;&lt;/script&gt;</span></code></pre>
      </li>
    </ol>

    <BadgeStyles />
  </Project>
</template>

<script setup lang="ts">
import Project from "~/layouts/project.vue";
const route = useRoute();
const { id } = route.params;
import Prism from "prismjs";
import "~/assets/css/material-dark.css";
import BadgeStyles from "~/components/badges/BadgeStyles.vue";

onMounted(() => {
  Prism.highlightAll();
});

definePageMeta({
  layout: "dashboard",
});
</script>
