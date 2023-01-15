module.exports = {
  apps: [
    {
      name: "Blog",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
    },
  ],
};
