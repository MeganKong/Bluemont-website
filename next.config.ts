import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // Old public page addresses, sent to the pages that replaced them in the
  // October 2026 redesign. Temporary (307), so they can still change.
  redirects() {
    return [
      { source: "/team", destination: "/about#team", permanent: false },
      { source: "/give", destination: "/donate", permanent: false },
      { source: "/donations", destination: "/impact", permanent: false },
    ];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
