const mongoose = require("mongoose");
const OrderItemSchema = new mongoose.Schema({bookId:String, price:Number});
const OrderSchema = new mongoose.Schema(
  {
    gmail:String,
    orderList:[OrderItemSchema],
    isAccpeted: {type:boolean, default:false}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Orders", OrderSchema);
