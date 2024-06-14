/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: false,
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },

  async redirects() {
    return [
      // Basic redirect
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },

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
        hostname: "images.metahub.space",
        port: "",
        pathname: "/background/**",
      },
      {
        protocol: "https",
        hostname: "images.metahub.space",
        port: "",
        pathname: "/logo/**",
      },
      {
        protocol: "https",
        hostname: "live.metahub.space",
        port: "",
        pathname: "/poster/**",
      },
      {
        protocol: "https",
        hostname: "live.metahub.space",
        port: "",
        pathname: "/background/**",
      },
      {
        protocol: "https",
        hostname: "live.metahub.space",
        port: "",
        pathname: "/logo/**",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "",
        pathname: "/images/**",
      },
      //episodes
      {
        protocol: "https",
        hostname: "episodes.metahub.space",
        port: "",
        pathname: "/**",
      },
      //addons
      {
        protocol: "https",
        hostname: "i.ibb.co",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default config;
