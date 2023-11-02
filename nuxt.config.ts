// https://nuxt.com/docs/api/configuration/nuxt-config
const AUTH_ORIGIN = process.env.AUTH_ORIGIN as string;

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
    "@sidebase/nuxt-auth",
    "nuxt-vercel-analytics",
  ],
  auth: {
    origin: AUTH_ORIGIN,
    basePath: "/api/auth/callback/github",
  },
});
