module.exports = {
  apps: [
    {
      name: "3000-blog",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
    },
  ],
};
