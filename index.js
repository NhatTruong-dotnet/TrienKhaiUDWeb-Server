const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const cors = require("cors");
const conversationRoute = require("./routes/conversations");

const userRoute = require("./routes/user");
const bookRoute = require("./routes/book");
const orderRoute = require("./routes/order");
const cartRoute = require("./routes/carts");

const port = process.env.PORT || 3000;

// const port = process.env.PORT || 3030;
dotenv.config();

mongoose.connect(
    process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("Connected to MongoDB");
    }
);

//middleware
app.use(express.json());
app.use(helmet());
app.use(
    cors({
        origin: "*",
    })
);
app.use("/api/conversations", conversationRoute);
app.use("/api/user", userRoute);
app.use("/api/book", bookRoute);
app.use("/api/order", orderRoute);
app.use("/api/carts", cartRoute);


app.listen(port, () => {
    console.log("Backend server is running!");
    console.log("localhost:" + port);
});