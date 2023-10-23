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
            <UAvatar size="xs" :src="`${user.image}`" />
            {{ user.name }}
          </UBadge>
          <UButton
            @click="signOut({ callbackUrl: '/' })"
            color="red"
            variant="outline"
            >Logout</UButton
          >
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const { data, signOut } = useAuth();
const { user } = data.value;

useHead({
  titleTemplate: "EnvBadge",
});
</script>
