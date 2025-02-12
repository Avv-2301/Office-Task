const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 100,
    },
    email: {
      type: String,
      required: true,
      maxLength: 100,
      unique: true,
    },
    password: {
      type: String,
      maxLength: 100,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    authType: {
      type: String,
      maxLength: 100,
    },
    token: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "manager"],
      default: "user",
    },
    status: {
      type: String,
      default: "0",
      enum: ["0", "1", "2"], //0-inactive, 1- active, 2- deleted
    },
    tokenExpiresAt: {
      type: Date,
      required: false,
    },
    last_login: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
