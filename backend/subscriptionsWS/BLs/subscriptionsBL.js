const Subscription = require("../models/subscriptionModel");

const getAllSubscriptions = () => {
	return new Promise((resolve, reject) => {
		Subscription.find({}, (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};
//-----------------------------------------------------
const getSubscriptionById = (subscriptionId) => {
	return new Promise((resolve, reject) => {
		Subscription.findById(subscriptionId, (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};
//-----------------------------------------------------
const addSubscription = (newSubscription) => {
	return new Promise((resolve, reject) => {
		let subscriptionToSave = new Subscription({
			memberId: newSubscription.memberId,
			movies: newSubscription.movies,
		});
		subscriptionToSave.save((err) => {
			if (err) {
				reject(err);
			} else {
				resolve(subscriptionToSave);
			}
		});
	});
};
//-----------------------------------------------------
const updateSubscription = (subscriptionId, subscriptionToUpdate) => {
	return new Promise((resolve, reject) => {
		Subscription.findByIdAndUpdate(
			subscriptionId,
			{
				memberId: subscriptionToUpdate.memberId,
				movies: subscriptionToUpdate.movies,
			},
			(err) => {
				if (err) {
					reject(err);
				} else {
					resolve("update subscription");
				}
			}
		);
	});
};
//-----------------------------------------------------
const deleteSubscription = (subscriptionId) => {
	return new Promise((resolve, reject) => {
		Subscription.findByIdAndRemove(subscriptionId, (err) => {
			if (err) {
				reject(err);
			} else {
				resolve("subscription deleted");
			}
		});
	});
};
//-----------------------------------------------------
module.exports = {
	getAllSubscriptions,
	getSubscriptionById,
	addSubscription,
	updateSubscription,
	deleteSubscription,
};
