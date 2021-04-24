require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;

// Database connection
const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(console.log("Connected with Database"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());

// User routers
const exerciseRouter = require("./routers/exercises");
const userRouter = require("./routers/user");

app.use("/exercise", exerciseRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`http://127.0.0.1:${port}`));
