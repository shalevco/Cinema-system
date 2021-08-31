const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
	userName: String,
	password: String,
});

module.exports = mongoose.model("users", userSchema);
