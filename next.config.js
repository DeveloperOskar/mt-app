await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  eslint: {
    //this should be checked pipelines
    ignoreDuringBuilds: true,
  },
  typescript: {
    //this should be checked pipelines
    ignoreBuildErrors: true,
  },

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
