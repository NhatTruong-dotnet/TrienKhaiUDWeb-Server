const mongoose = require("mongoose");
const shippingAddressSchema = new mongoose.Schema({ isDefault: { type: Boolean, default: false }, address: Number });
const addedPointLogSchema = new mongoose.Schema({ billID: String, addedPoint: Number });
const seenItemSchema = new mongoose.Schema({ bookId: String });
const wishItemSchema = new mongoose.Schema({ bookId: String });
const UserSchema = new mongoose.Schema({
    gmail: String,
    passwordHash: String,
    profilePicture: String,
    shippingAddress: [shippingAddressSchema],
    isVipMember: { type: Boolean, default: false },
    addedPointLogs: [addedPointLogSchema],
    currentPoint: Number,
    seenList: [seenItemSchema],
    wishList: [wishItemSchema]
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema, "User");