const mongoose = require("mongoose");
const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    name: {
      type: String,
      require: true,
    },
    comment: {
      type: String,
      require: true,
    },
    rating: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    countInStock: {
      type: Number,
      require: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("product", productSchema);
