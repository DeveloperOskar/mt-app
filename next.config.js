/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  rewrites: async () => {
    return [
      {
        source: "/dev/pdf/meal-plan",
        destination:
          process.env.NODE_ENV === "production" ? "/404" : "/dev/pdf/meal-plan",
      },
    ];
  },
};

export default config;
