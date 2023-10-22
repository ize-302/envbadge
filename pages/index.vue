<template>
  <div class="flex flex-col justify-between h-screen">
    <div class="flex justify-between items-center py-5">
      <h1 class="text-2xl font-bold text-primary">EnvBadge</h1>
      <ColorModeButton />
    </div>

    <div class="flex flex-col items-center gap-5 -mt-32">
      <h1
        class="text-4xl text-center justify-center text-slate-800 dark:text-white font-semibold"
      >
        You are in a safe environment 👌!
      </h1>
      <p class="text-xl max-w-xl text-center">
        EnvBadge keeps a watchful eye on your app's environments and gives you a
        friendly heads-up whenever it's not in production mode.
      </p>
      <UButton>Continue with Github</UButton>
    </div>

    <div></div>
  </div>
</template>
