const axios = require("axios");
const express = require("express");
const router = express.Router();

router.route("/").get(async (req, resp) => {
	let response = await axios.get(`http://localhost:8000/subscriptions/members`);
	return resp.json(response.data);
});
//-----------------------------------------------------
router.route("/:id").get(async (req, resp) => {
	let memberId = req.params.id;
	let response = await axios.get(
		`http://localhost:8000/subscriptions/members/${memberId}`
	);
	return resp.json(response.data);
});
//-----------------------------------------------------
router.route("/").post(async (req, resp) => {
	let newMember = req.body;
	let response = await axios.post(
		`http://localhost:8000/subscriptions/members`,
		newMember
	);
	return resp.json(response.data);
});
//-----------------------------------------------------
router.route("/:id").put(async (req, resp) => {
	let memberId = req.params.id;
	let updateMember = req.body;
	let response = await axios.put(
		`http://localhost:8000/subscriptions/members/${memberId}`,
		updateMember
	);
	return resp.json(response.data);
});
//-----------------------------------------------------
router.route("/:id").delete(async (req, resp) => {
	let memberId = req.params.id;
	let response = await axios.delete(
		`http://localhost:8000/subscriptions/members/${memberId}`
	);
	return resp.json(response.data);
});

module.exports = router;
