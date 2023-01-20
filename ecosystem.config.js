module.exports = {
  apps: [
    {
      name: "3000-blog",
      exec_mode: "cluster",
      instances: "max",
      script: "./packages/blog/.output/server/index.mjs",
    },
    {
      name: "8000-blog-server",
      exec_mode: "cluster",
      instances: "max",
      script: "./packages/server/dist/index.js",
    },
  ],
};
