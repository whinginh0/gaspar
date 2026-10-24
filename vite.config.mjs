import { resolve } from "node:path";
import { defineConfig } from "vite";

function bioRoute() {
  return {
    name: "bio-route",
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        if (!request.url) return next();

        const [pathname, query] = request.url.split("?");
        const suffix = query ? `?${query}` : "";

        if (pathname === "/bio") {
          response.statusCode = 308;
          response.setHeader("Location", `/bio/${suffix}`);
          response.end();
          return;
        }

        if (pathname === "/bio/") {
          request.url = `/linktree/index.html${suffix}`;
        } else if (pathname.startsWith("/bio/")) {
          request.url = `/linktree/${pathname.slice(5)}${suffix}`;
        }

        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [bioRoute()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        bio: resolve(import.meta.dirname, "linktree/index.html"),
      },
    },
  },
});
