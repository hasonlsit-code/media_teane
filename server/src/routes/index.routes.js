const userRouter = require("./user.routes");
function routes(app) {
  app.use("/api/user", userRouter);
}
module.exports = routes;
