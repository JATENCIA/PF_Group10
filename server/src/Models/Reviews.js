const mongoose = require("mongoose");
const reviewSchema = mongoose.Schema({
  description: {
    type: String,
    minLength: 10,
    maxLength: 500,
  },

  rate: {
    type: Number,
    min: 0,
    max: 5,
  },

  user: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },

  product: {
    type: mongoose.Types.ObjectId,
    ref: "Products",
  },

  baneado: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Review", reviewSchema);
