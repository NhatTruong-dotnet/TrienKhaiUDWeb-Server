const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const conversationRoute = require("./routes/conversations");
const userRoute = require("./routes/users");
const ratingCommentRoute = require("./routes/rating-comment");
const orderRoute = require("./routes/order");
const cartRoute = require("./routes/carts");

const bodyParser = require("body-parser");
const authRoute = require("./routes/auth");
const BooksRoute = require("./routes/Books");
const PriceRouter = require("./routes/Search-Price");
const publisherRouter = require("./routes/Search-Publisher");
const suppilerRouter = require("./routes/Search-Suppiler");
const translatorRouter = require("./routes/Search-Translator");
const SearchAllRouter = require("./routes/Search");
const ImageRouter = require("./routes/images");

const CartRoute = require("./routes/carts");
const BillRoute = require("./routes/bill");
const SeenList = require("./routes/seenList");

const port = process.env.PORT || 3000;
const portSocket= process.env.PORTSOCKET || 8800;

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

//APIs Info User

//APIs Login/Register Account
app.use(
  cors({
    origin: "*",
  })
);
app.use("/api/conversations", conversationRoute);

app.use("/api/rating-comment", ratingCommentRoute);
app.use("/api/order", orderRoute);

app.use("/api/Books", BooksRoute);
app.use("/api/users", userRoute);
app.use("/api/Books/Search-Price", PriceRouter);
app.use("/api/Books/Search-Publisher", publisherRouter);
app.use("/api/Books/Search-Suppiler", suppilerRouter);
app.use("/api/Books/Search-Translator", translatorRouter);
app.use("/api/Books/Search", SearchAllRouter);
app.use("/api/carts", CartRoute);
app.use("/api/bills", BillRoute);
app.use("/api/seenList", SeenList);
app.use("/api/conversations", conversationRoute);
app.use("/api/auth", authRoute);
app.use("/api/image", ImageRouter);
let adminId = [];
let clientId = [];
const io = require("socket.io")(portSocket, {
  cors: {
    origin: "*",
  },
});
let users = [];
const addUser = (gmail, socketId) => {
  !users.some((user) => user.gmail === gmail) &&
    users.push({ gmail, socketId });
};
io.on("connection", (socket) => {
    console.log('user-connect');
  socket.on("admin-connect", () => {
    adminId = [];
    if (!adminId.includes(socket.id)) {
      adminId.push(socket.id);
    }
  });
  socket.on("clientChat", () => {
    if (!clientId.includes(socket.id)) {
      clientId.push(socket.id);
    }
    adminId.map((element) => {
      socket.to(element).emit("forwardToAdmin", "hello");
    });
  });
  socket.on("adminChat", ()=>{
      clientId.map((element)=>{
          console.log('emit to client');
        socket.to(element).emit("newMessageFromAdmin", "hello");
      })
  })
});

app.listen(port, () => {
  console.log("Backend server is running!");
  console.log("localhost:" + port);
});
