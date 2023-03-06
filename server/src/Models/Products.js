const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },

  price: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },

  image: {
    type: String,
  },

  baneado: {
    type: Boolean,
    default: false,
  },

  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 99,
  },

  description: {
    type: String,
    required: true,
    minLength: 30,
    maxLength: 500,
  },

  restaurant: {
    type: mongoose.Types.ObjectId,
    ref: "Restaurants",
  },
});

module.exports = mongoose.model("Products", productSchema);
