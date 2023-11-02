export default defineAppConfig({
  ui: {
    primary: "green",
  },
  colorMode: {
    preference: "light",
  },
  vercelAnalytics: {
    mode: "auto",
    debug: true,
    beforeSend: (event: { url: string | string[] }) => {
      if (event.url.includes("/private")) return null;
      return event;
    },
  },
});
