const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    orderItems: [
      {
        //reason: BSONTypeError: Argument passed in must be a string of 12 bytes or a string of 24 hex characters
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        _id: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: Number, required: true },
      country: { type: String, required: true },
    },
    orderAmount: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    isDelivered: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("order", orderSchema);
