const express = require("express");
const app = express();
const port = 3000;

require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// conect db
const connectDB = require("./config/connectDB");

const routes = require("./routes/index.routes");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
connectDB();
app.get("/", (req, res) => {
  return res.json({
    message: "ok",
    metadata: { message: "ok" },
  });
});

routes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
