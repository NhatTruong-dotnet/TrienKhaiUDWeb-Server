const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const conversationRoute = require("./routes/conversations");
const port = process.env.PORT || 3000
dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);


//middleware
app.use(express.json());
app.use(helmet());

app.use("/api/conversations", conversationRoute);

app.listen(port, () => {
  console.log("Backend server is running!");
  console.log(port);
});