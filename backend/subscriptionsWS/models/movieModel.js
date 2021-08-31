const mongoose = require("mongoose");

let movieSchema = new mongoose.Schema({
	name: String,
	genres: [String],
	image: String,
	premiered: Date,
});

module.exports = mongoose.model("movies", movieSchema);
