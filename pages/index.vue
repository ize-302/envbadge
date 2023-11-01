<template>
  <div class="flex flex-col justify-between h-screen">
    <div class="flex justify-between items-center py-5">
      <h1 class="text-2xl font-bold text-primary font-jakarta">EnvBadge</h1>
      <div class="flex justify-between items-center gap-2">
        <ColorModeButton />
        <UButton
          v-if="user_status === 'unauthenticated'"
          class="font-jakarta"
          @click="signIn('github', { callbackUrl: '/projects' })"
          >Signin with Github</UButton
        >
        <UButton v-else class="font-jakarta" @click="router.push('/projects')">
          My projects</UButton
        >
      </div>
    </div>

    <div class="flex flex-col items-center gap-5 -mt-32">
      <p
        class="text-4xl max-w-xl text-center font-jakarta dark:text-white font-semibold"
      >
        Know your current working web environment at a glance 👌
      </p>
    </div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
const { signIn, status } = useAuth();
const user_status = status.value;
const router = useRouter();

definePageMeta({
  title: "Some Page",
});
</script>
