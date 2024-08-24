const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
const passRouter = require("./routes/PassRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");
require("dotenv").config();
require("./config/database").connect();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(express.json());
app.use(errorMiddleware);

app.use("/", passRouter);

app.listen(PORT, () => {
  console.log("server running");
});
