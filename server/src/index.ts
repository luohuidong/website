import Koa from "koa";

import middleware from "./middlewares/index.js";
import registerRouter from "./modules/registerRouter.js";

const app = new Koa();
middleware(app);
registerRouter(app);

app.listen(8000, () => {
  console.log("server on 8000");
});
