const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },

  image: {
    type: String,
  },

  lastName: {
    type: String,
    minLength: 3,
    maxLength: 50,
  },

  dni: {
    type: Number,
    unique: true,
    minLength: 7,
    maxLength: 10,
  },

  eMail: {
    type: String,
    required: true,
    unique: true,
  },

  location: {
    type: String,
    ref: "Location",
  },

  telephone: {
    type: String,
    unique: true,
    minLength: 7,
    maxLength: 10,
  },

  baneado: {
    type: Boolean,
    default: false,
  },

  review: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Reviews",
    },
  ],

  password: {
    type: String,
    required: true,
  },

  favorites: {
    type: Array,
  },

  isSeller: {
    type: Boolean,
    default: false,
  },

  restaurant: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Restaurants",
    },
  ],
});

module.exports = mongoose.model("Users", userSchema);
