const jsonFile = require("jsonfile");
const userJsonPath = "./DataSources/users.json";

const getAllUsersJson = () => {
	return new Promise((resolve, reject) => {
		jsonFile.readFile(userJsonPath, (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};
//-----------------------------------------------------
const getUserByIdJson = async (userId) => {
	let users = await getAllUsersJson();
	let index = users.findIndex((user) => user.id == userId);
	return new Promise((resolve) => {
		resolve(users[index]);
	});
};
//-----------------------------------------------------
const addUserJson = async (newUser) => {
	let userToSave = {
		id: newUser.id,
		firstName: newUser.firstName,
		lastName: newUser.lastName,
		createdDate: newUser.createdDate,
		sessionTimeOut: newUser.sessionTimeOut,
	};
	let updatedUsers = await getAllUsersJson();
	updatedUsers.push(userToSave);
	return new Promise((resolve, reject) => {
		jsonFile.writeFile(userJsonPath, updatedUsers, (err) => {
			if (err) {
				reject(err);
			} else {
				resolve(userToSave);
			}
		});
	});
};
//-----------------------------------------------------
const updateUserJson = async (userId, userToUpdate) => {
	let updatedUsers = await getAllUsersJson();
	let index = updatedUsers.findIndex((user) => user.id == userId);
	updatedUsers[index] = {
		id: userToUpdate.id,
		firstName: userToUpdate.firstName,
		lastName: userToUpdate.lastName,
		createdDate: userToUpdate.createdDate,
		sessionTimeOut: userToUpdate.sessionTimeOut,
	};
	return new Promise((resolve, reject) => {
		jsonFile.writeFile(userJsonPath, updatedUsers, (err) => {
			if (err) {
				reject(err);
			} else {
				resolve("Update User(Json)");
			}
		});
	});
};
//-----------------------------------------------------
const deleteUserJson = async (userId) => {
	let updatedUsers = await getAllUsersJson();
	let index = updatedUsers.findIndex((user) => user.id == userId);
	updatedUsers.splice(index, 1);
	return new Promise((resolve, reject) => {
		jsonFile.writeFile(userJsonPath, updatedUsers, (err) => {
			if (err) {
				reject(err);
			} else {
				resolve("User Deleted(Json)");
			}
		});
	});
};

module.exports = {
	getAllUsersJson,
	getUserByIdJson,
	addUserJson,
	updateUserJson,
	deleteUserJson,
};
