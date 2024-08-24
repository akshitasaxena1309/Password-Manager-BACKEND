const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const corsOptions = {
  origin: "https://password-manager-kappa-lilac.vercel.app",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  Credentials: true,
};
app.use(cors(corsOptions));
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
