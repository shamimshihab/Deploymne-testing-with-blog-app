const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ReviewSchema = new Schema(
  {
    comment: { type: String, required: true },
    author: { type: String, ref: "User" },
    authorID: { type: String, ref: "User" },
  },

  {
    timestamps: true,
  }
);

const ReviewModel = model("Review", ReviewSchema);

module.exports = ReviewModel;
