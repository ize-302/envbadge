<template>
  <div class="flex flex-col justify-between h-screen">
    <div class="flex justify-between items-center py-5">
      <h1 class="text-xl font-bold dark:text-white">🚧 EnvBadge</h1>
      <ColorModeButton />
    </div>

    <div class="flex flex-col items-center gap-5 -mt-32">
      <p class="text-4xl max-w-xl text-center dark:text-white font-bold">
        Identify your current web environment at a glance 👀
      </p>
      <p class="opacity-80">
        A simple and easy way to identify your current web environment.
      </p>
      <div class="flex gap-5">
        <UButton
          variant="soft"
          size="lg"
          class="mt-5"
          label="Documentation"
          to="/docs"
        ></UButton>
        <UButton
          size="lg"
          class="mt-5"
          label="Try now"
          @click="
            user_status === 'unauthenticated'
              ? signIn('github', { callbackUrl: '/projects' })
              : router.push('/projects')
          "
        >
          <template #trailing>
            <UIcon name="i-heroicons-arrow-right-20-solid" />
          </template>
        </UButton>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import {
  AppsFilledIcon,
  BrandGithubIcon,
  FileIcon,
  LayoutGridIcon,
} from "vue-tabler-icons";

const { signIn, status } = useAuth();
const user_status = status.value;
const router = useRouter();

definePageMeta({
  title: "Some Page",
});
</script>
