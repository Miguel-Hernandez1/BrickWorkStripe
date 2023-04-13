const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  plan: { type: String, required: true },
  creditBalance: { type: Number, required: true },
});

module.exports = mongoose.model("User", userSchema);
