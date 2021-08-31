const mongoose = require("mongoose");

let memberSchema = new mongoose.Schema({
	name: String,
	email: String,
	city: String,
});

module.exports = mongoose.model("members", memberSchema);
