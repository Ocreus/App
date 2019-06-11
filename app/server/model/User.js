const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  settings: {
    address: {
      street: {
        type: String,
      },
      number: {
        type: String,
      },
      town: {
        type: String,
      },
      post_code: {
        type: Number,
      },
    },
    social: {
      facebook: {
        type: String,
      },
      twitter: {
        type: String,
      },
      instagram: {
        type: String,
      },
      linkedin: {
        type: String,
      },
    },
  },
});

module.exports = User = mongoose.model("user", UserSchema);
