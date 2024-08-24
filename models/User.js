const mongoose = require("mongoose");

// Define the User schema with embedded sitePassword
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  site: [
    {
      site: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
