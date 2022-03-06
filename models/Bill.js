const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema(
  {
    orderId: String,
    isDelivery: {type:Boolean, default: false},
    paymentMethod:String,
    totalPayment: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bill", BillSchema,"Bill");
