const mongoose = require("mongoose");

let subscriptionSchema = new mongoose.Schema({
	memberId: mongoose.Types.ObjectId,
	movies: [{ movieId: mongoose.Types.ObjectId, date: Date }],
});

module.exports = mongoose.model("subscriptions", subscriptionSchema);
