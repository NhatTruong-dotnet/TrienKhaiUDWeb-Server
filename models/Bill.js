const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema(
  {
    orderId: String,
    isDelivery: {type:Boolean, default: false},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bill", BillSchema);
