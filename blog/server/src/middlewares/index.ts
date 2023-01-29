import type { App } from "./types.js";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";

import logger from "./logger.js";
import jsonError from "./jsonError.js";

/**
 * 注册 middleware
 * @param app
 */
export default function middleware(app: App): void {
  app.use(cors());
  app.use(bodyParser());
  logger(app);
  jsonError(app);
}
