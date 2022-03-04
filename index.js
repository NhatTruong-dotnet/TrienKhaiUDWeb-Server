const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const bodyParser = require("body-parser");
const conversationRoute = require("./routes/conversations");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
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
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/conversations", conversationRoute);
//APIs Info User
app.use("/api/users", userRoute);
//APIs Login/Register Account
app.use("/api/auth", authRoute);

app.listen(port, () => {
  console.log("Backend server is running!");
  console.log(port);
});