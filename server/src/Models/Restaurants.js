const mongoose = require("mongoose");

const restaurantSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
    unique: true,
  },

  image: {
    type: String,
  },

  eMail: {
    type: String,
    required: true,
    unique: true,
  },

  location: {
    type: String,
    ref: "Location",
    required: true,
  },

  telephone: {
    type: String,
    unique: true,
    minLength: 7,
    maxLength: 10,
    required: true,
  },

  baneado: {
    type: Boolean,
    default: false,
  },

  review: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Review",
    },
  ],

  user: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },

  product: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Products",
    },
  ],
});

module.exports = mongoose.model("Restaurants", restaurantSchema);
