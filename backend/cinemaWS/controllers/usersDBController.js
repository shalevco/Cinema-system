const express = require("express");
const usersDBBL = require("../BLs/usersDBBL");
const router = express.Router();
//-----------------------------------------------------
router.route("/").get(async (req, resp) => {
	let data = await usersDBBL.getAllUsersDB();
	return resp.json(data);
});
//-----------------------------------------------------
router.route("/:id").get(async (req, resp) => {
	let userId = req.params.id;
	let data = await usersDBBL.getUserByIdDB(userId);
	return resp.json(data);
});
//-----------------------------------------------------
router.route("/").post(async (req, resp) => {
	let newUser = req.body;
	let data = await usersDBBL.addUserDB(newUser);
	return resp.json(data);
});
//-----------------------------------------------------
router.route("/:id").put(async (req, resp) => {
	let userId = req.params.id;
	let updateUser = req.body;
	let status = await usersDBBL.updateUserDB(userId, updateUser);
	return resp.json(status);
});
//-----------------------------------------------------
router.route("/:id").delete(async (req, resp) => {
	let userId = req.params.id;
	let status = await usersDBBL.deleteUserDB(userId);
	return resp.json(status);
});

module.exports = router;
