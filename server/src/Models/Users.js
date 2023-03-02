const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
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
    minLength: 9,
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
});

module.exports = mongoose.model("Users", userSchema);
