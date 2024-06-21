const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    minLength: 10,
    unique: true // No comma needed here
  },
  userType: {
    type: String,
    required: true,
    default: "CUSTOMER",
    enum: ["CUSTOMER", "ADMIN"]
  }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("User", userSchema);
