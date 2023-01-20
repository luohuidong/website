import Router from "@koa/router";
import { PostController } from "./conroller.js";

const router = new Router();
const controller = new PostController();

router.get("/post/:postfilename", controller.getPost);
router.get("/posts", controller.getPosts);

export default router;
