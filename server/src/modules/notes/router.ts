import Router from "@koa/router";
import { NoteController } from "./conroller.js";

const router = new Router({
  prefix: "/notes",
});
const controller = new NoteController();

router.get("/", controller.getNotebooks);
router.get("/:notebookDirName", controller.getNotebookPosts);
router.get("/:notedirname/:postlink*", controller.getPost);

export default router;
