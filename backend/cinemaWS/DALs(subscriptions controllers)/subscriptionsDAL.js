const axios = require("axios");
const express = require("express");
const router = express.Router();

router.route("/").get(async (req, resp) => {
	let response = await axios.get(
		`http://localhost:8000/subscriptions/subscriptions`
	);
	return resp.json(response.data);
});
//-----------------------------------------------------
router.route("/:id").get(async (req, resp) => {
	let subscriptionId = req.params.id;
	let response = await axios.get(
		`http://localhost:8000/subscriptions/subscriptions/${subscriptionId}`
	);
	return resp.json(response.data);
});
//-----------------------------------------------------
router.route("/").post(async (req, resp) => {
	let newSubscription = req.body;
	let response = await axios.post(
		`http://localhost:8000/subscriptions/subscriptions`,
		newSubscription
	);
	return resp.json(response.data);
});
//-----------------------------------------------------
router.route("/:id").put(async (req, resp) => {
	let subscriptionId = req.params.id;
	let updateSubscription = req.body;
	let response = await axios.put(
		`http://localhost:8000/subscriptions/subscriptions/${subscriptionId}`,
		updateSubscription
	);
	return resp.json(response.data);
});
//-----------------------------------------------------
router.route("/:id").delete(async (req, resp) => {
	let subscriptionId = req.params.id;
	let response = await axios.delete(
		`http://localhost:8000/subscriptions/subscriptions/${subscriptionId}`
	);
	return resp.json(response.data);
});

module.exports = router;
