import Router from "@koa/router";
import { PostController } from "./conroller.js";

const router = new Router({
  prefix: "/posts",
});
const controller = new PostController();

router.get("/", controller.getPosts);
router.get("/:postfilename", controller.getPost);

export default router;
