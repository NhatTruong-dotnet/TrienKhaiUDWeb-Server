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
const cors = require("cors");
const BooksRoute = require("./routes/Books");
const PriceRouter = require("./routes/Search-Price");
const publisherRouter = require("./routes/Search-Publisher");
const suppilerRouter = require("./routes/Search-Suppiler");
const translatorRouter = require("./routes/Search-Translator");
const CartRoute = require("./routes/carts");
const BillRoute = require("./routes/bill");
const SeenList = require("./routes/seenList");
const port = process.env.PORT || 3030;
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
app.use(
  cors({
    origin: "*",
  })
);
app.use("/api/conversations", conversationRoute);
app.use("/api/Books", BooksRoute);
app.use("/api/Books/Search-Price", PriceRouter);
app.use("/api/Books/Search-Publisher", publisherRouter);
app.use("/api/Books/Search-Suppiler", suppilerRouter);
app.use("/api/Books/Search-Translator", translatorRouter);
app.use("/api/carts", CartRoute);
app.use("/api/bills", BillRoute);
app.use("/api/seenList", SeenList);

const io = require("socket.io")(8900,{
  cors:{
      origin:"*"
  }
});

io.on("connection", (socket) => {
  console.log("a user connected");
})



app.use("/api/carts", CartRoute); 
app.listen(port, () => {
  console.log("Backend server is running!");
  console.log(port);
});