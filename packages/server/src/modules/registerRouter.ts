import type Koa from "koa";
import fs from "node:fs";
import Router from "@koa/router";
import path from "node:path";
import url from "node:url";

/**
 * 动态加载 routes 文件夹下的所有路由相关文件
 * @param app
 */
export default function importRoute(app: Koa<Koa.DefaultState, Koa.DefaultContext>): void {
  const currentDir = url.fileURLToPath(new URL(".", import.meta.url));

  // 获取所有定义路由的文件名
  const modules = fs
    .readdirSync(currentDir)
    .filter((module) => fs.statSync(path.resolve(currentDir, module)).isDirectory());

  // 通过文件名动态加载文件中定义的路由
  modules.forEach(async (module) => {
    const route = (await import(`./${module}/router.js`)).default as Router;
    app.use(route.routes()).use(route.allowedMethods());
  });
}
