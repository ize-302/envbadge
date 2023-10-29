// ~/server/middleware/proxy.ts
import type { IncomingMessage, ServerResponse } from "http";
import httpProxy from "http-proxy";

const proxy = httpProxy.createProxyServer({
  target: `https://envbadge.vercel.app`,
  changeOrigin: true,
});

// export default function (req: IncomingMessage, res: ServerResponse, next) {
export default defineEventHandler((event) => {
  console.log("proxy middleware");
  const prefix = "/api";
  const extraOptions = {};
  proxy.web(event.node.req, event.node.res, extraOptions);
  // if (req.url.startsWith(prefix)) {
  //   const extraOptions = {};
  //   proxy.web(req, res, extraOptions);
  // } else {
  //   next();
  // }
});
