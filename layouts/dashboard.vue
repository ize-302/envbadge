<template>
  <div class="text-[#0f3254] dark:text-gray-300">
    <div class="container mx-auto max-w-5xl px-5">
      <div
        class="flex justify-between items-center py-5 border-b-[0.1px] border-slate-300 dark:border-slate-700"
      >
        <h1 class="text-lg font-medium text-black dark:text-white font-jakarta">
          🚧 EnvBadge
        </h1>
        <div class="flex justify-between items-center gap-2">
          <ColorModeButton />
          <UBadge class="gap-1" color="gray" variant="solid" size="lg">
            <UAvatar size="xs" :src="`${currentUser?.avatar_url}`" />
            {{ currentUser?.login }}
          </UBadge>
          <UButton @click="logout()" color="red" variant="outline"
            >Logout</UButton
          >
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "../store";

const route = useRoute();
const router = useRouter();
const store = useStore();
const { accessToken } = route.query;
let currentUser = ref();

useHead({
  titleTemplate: "EnvBadge",
});

const conditionals = async () => {
  if (store.accessToken === "") {
    store.logout();
    window.location.href = String("/");
  } else {
    const user = await $fetch(`/api/user?accessToken=${store.accessToken}`);
    currentUser.value = user;
  }
};

const logout = () => {
  store.logout();
  window.location.href = String("/");
};

if (route.query.accessToken) {
  store.saveToken(accessToken as string);
  router.push("/dashboard");
}

onMounted(async () => {
  await conditionals();
});
</script>
