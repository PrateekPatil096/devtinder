const express = require("express");
const app = express();
const connectDB = require("./config/database");

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);

connectDB()
  .then(() => {
    console.log("database connection successfully ");
    app.listen(7777, () => {
      console.log("server is successfully listenting on port 7777");
    });
  })

  .catch((err) => {
    console.error("database cannot be connected", err);
  });
