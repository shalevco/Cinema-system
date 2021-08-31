const jsonFile = require("jsonfile");
const permissionsJsonPath = "./DataSources/permissions.json";

const getAllPermissionsJson = () => {
	return new Promise((resolve, reject) => {
		jsonFile.readFile(permissionsJsonPath, (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};
//-----------------------------------------------------
const getPermissionByIdJson = async (permissionId) => {
	let permissions = await getAllPermissionsJson();
	let index = permissions.findIndex(
		(permission) => permission.id == permissionId
	);
	return new Promise((resolve) => {
		resolve(permissions[index]);
	});
};
//-----------------------------------------------------
const addPermissionJson = async (newPermission) => {
	let permissionsToSave = {
		id: newPermission.id,
		permissions: newPermission.permissions,
	};
	let updatedPermissions = await getAllPermissionsJson();
	updatedPermissions.push(permissionsToSave);
	return new Promise((resolve, reject) => {
		jsonFile.writeFile(permissionsJsonPath, updatedPermissions, (err) => {
			if (err) {
				reject(err);
			} else {
				resolve(permissionsToSave);
			}
		});
	});
};
//-----------------------------------------------------
const updatePermissionJson = async (permissionId, permissionToUpdate) => {
	let updatedPermissions = await getAllPermissionsJson();
	let index = updatedPermissions.findIndex(
		(permission) => permission.id == permissionId
	);
	updatedPermissions[index] = {
		id: permissionToUpdate.id,
		permissions: permissionToUpdate.permissions,
	};
	return new Promise((resolve, reject) => {
		jsonFile.writeFile(permissionsJsonPath, updatedPermissions, (err) => {
			if (err) {
				reject(err);
			} else {
				resolve("Update Permission(Json)");
			}
		});
	});
};
//-----------------------------------------------------
const deletePermissionJson = async (permissionId) => {
	let updatedPermissions = await getAllPermissionsJson();
	let index = updatedPermissions.findIndex(
		(permission) => permission.id == permissionId
	);
	updatedPermissions.splice(index, 1);
	return new Promise((resolve, reject) => {
		jsonFile.writeFile(permissionsJsonPath, updatedPermissions, (err) => {
			if (err) {
				reject(err);
			} else {
				resolve("Permission Deleted(Json)");
			}
		});
	});
};

module.exports = {
	getAllPermissionsJson,
	getPermissionByIdJson,
	addPermissionJson,
	updatePermissionJson,
	deletePermissionJson,
};
