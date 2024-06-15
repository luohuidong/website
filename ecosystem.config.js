module.exports = {
  apps: [
    {
      name: "3000-blog",
      script: "serve",
      env: {
        PM2_SERVE_PATH: "./dist",
        PM2_SERVE_PORT: 3000,
      },
    },
  ],
};
