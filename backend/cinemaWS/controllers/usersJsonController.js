const express = require("express");
const usersJsonBL = require("../BLs/usersJsonBL");
const router = express.Router();
//-----------------------------------------------------
router.route("/").get(async (req, resp) => {
	let data = await usersJsonBL.getAllUsersJson();
	return resp.json(data);
});
//-----------------------------------------------------
router.route("/:id").get(async (req, resp) => {
	let userId = req.params.id;
	let data = await usersJsonBL.getUserByIdJson(userId);
	return resp.json(data);
});
//-----------------------------------------------------
router.route("/").post(async (req, resp) => {
	let newUser = req.body;
	let data = await usersJsonBL.addUserJson(newUser);
	return resp.json(data);
});
//-----------------------------------------------------
router.route("/:id").put(async (req, resp) => {
	let userId = req.params.id;
	let updateUser = req.body;
	let status = await usersJsonBL.updateUserJson(userId, updateUser);
	return resp.json(status);
});
//-----------------------------------------------------
router.route("/:id").delete(async (req, resp) => {
	let userId = req.params.id;
	let status = await usersJsonBL.deleteUserJson(userId);
	return resp.json(status);
});

module.exports = router;
