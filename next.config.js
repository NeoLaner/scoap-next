/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.metahub.space",
        port: "",
        pathname: "/poster/**",
      },
      {
        protocol: "https",
        hostname: "live.metahub.space",
        port: "",
        pathname: "/poster/**",
      },
    ],
  },
};

export default config;
