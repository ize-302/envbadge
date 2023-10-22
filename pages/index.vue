<template>
  <div class="flex flex-col justify-between h-screen">
    <div class="flex justify-between items-center py-5">
      <h1 class="text-2xl font-bold text-primary font-jakarta">EnvBadge</h1>
      <ColorModeButton />
    </div>

    <div class="flex flex-col items-center gap-5 -mt-32">
      <h1
        class="text-4xl text-center justify-center dark:text-white font-semibold font-jakarta"
      >
        You are in a safe environment 👌!
      </h1>
      <p class="text-xl max-w-xl text-center font-jakarta opacity-80">
        EnvBadge keeps a watchful eye on your app's environments and gives you a
        friendly heads-up whenever it's not in production mode.
      </p>
      <NuxtLink
        class="font-jakarta"
        :to="`https://github.com/login/oauth/authorize?scope=user:email&client_id=${NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=repo`"
      >
        <UButton>Continue with Github</UButton>
      </NuxtLink>
    </div>

    <div></div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const { NEXT_PUBLIC_GITHUB_CLIENT_ID } = process.env;

definePageMeta({
  title: "Some Page",
});
</script>
