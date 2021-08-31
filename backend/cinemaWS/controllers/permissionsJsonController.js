const express = require("express");
const permissionsJsonBL = require("../BLs/permissionsJsonBL");
const router = express.Router();
//-----------------------------------------------------
router.route("/").get(async (req, resp) => {
	let data = await permissionsJsonBL.getAllPermissionsJson();
	return resp.json(data);
});
//-----------------------------------------------------
router.route("/:id").get(async (req, resp) => {
	let permissionId = req.params.id;
	let data = await permissionsJsonBL.getPermissionByIdJson(permissionId);
	return resp.json(data);
});
//-----------------------------------------------------
router.route("/").post(async (req, resp) => {
	let newPermission = req.body;
	let data = await permissionsJsonBL.addPermissionJson(newPermission);
	return resp.json(data);
});
//-----------------------------------------------------
router.route("/:id").put(async (req, resp) => {
	let permissionId = req.params.id;
	let updatePermission = req.body;
	let status = await permissionsJsonBL.updatePermissionJson(
		permissionId,
		updatePermission
	);
	return resp.json(status);
});
//-----------------------------------------------------
router.route("/:id").delete(async (req, resp) => {
	let permissionId = req.params.id;
	let status = await permissionsJsonBL.deletePermissionJson(permissionId);
	return resp.json(status);
});

module.exports = router;
