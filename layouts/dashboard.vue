<template>
  <Default>
    <div
      class="flex justify-between items-center py-5 border-b-[0.1px] border-slate-300 dark:border-slate-700"
    >
      <ULink to="/" class="text-lg font-medium text-black dark:text-white">
        🚧 EnvBadge
      </ULink>
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
    <UNotifications />
  </Default>
</template>

<script setup lang="ts">
const { data, signOut } = useAuth();
const { user } = data.value;
import Default from "~/layouts/default.vue";

useHead({
  titleTemplate: "EnvBadge",
});
</script>
