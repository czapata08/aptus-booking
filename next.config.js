/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js")

/** @type {import("next").NextConfig} */
const config = {
  // [todo]: need to add multiple loaders for different file types
  images: {
    loader: "custom",
    // this is a loader for public images
    loaderFile: "./supabase-image-loader.ts",
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

export default config
