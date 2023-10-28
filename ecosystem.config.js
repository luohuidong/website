module.exports = {
  apps: [
    {
      name: "3000-blog",
      script: "./blog/.output/server/index.mjs",
      env: {
        NUXT_BLOG_SERVER: "https://api.luohuidong.cn/blog",
      },
    },
    {
      name: "8000-blog-server",
      script: "./server/dist/index.js",
    },
  ],
};
