module.exports = {
  apps: [
    {
      name: "3000-blog",
      exec_mode: "cluster",
      instances: "max",
      script: "./website/blog/.output/server/index.mjs",
      env: {
        NUXT_BLOG_SERVER: "https://api.luohuidong.cn/blog",
      },
    },
    {
      name: "8000-blog-server",
      exec_mode: "cluster",
      instances: "max",
      script: "./website/server/dist/index.js",
    },
  ],
};
