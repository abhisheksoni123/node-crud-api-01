const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    rate: {
      type: Number,
      required: false,
    },
    count: {
      type: Number,
      required: false,
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
      trim: true,
    },
    price: {
      type: Number,
      required: false,
      min: 0,
    },
    description: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: false,
      index: true,
    },
    image: {
      type: String,
      required: false,
    },
    rating: ratingSchema,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
