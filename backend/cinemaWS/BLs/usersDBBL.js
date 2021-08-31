const User = require("../models/userModel");

const getAllUsersDB = () => {
	return new Promise((resolve, reject) => {
		User.find({}, (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};
//-----------------------------------------------------
const getUserByIdDB = (userId) => {
	return new Promise((resolve, reject) => {
		User.findById(userId, (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};
//-----------------------------------------------------
const addUserDB = (newUser) => {
	return new Promise((resolve, reject) => {
		let userToSave = new User({
			userName: newUser.userName,
			password: newUser.password,
		});
		userToSave.save((err) => {
			if (err) {
				reject(err);
			} else {
				resolve(userToSave);
			}
		});
	});
};
//-----------------------------------------------------
const updateUserDB = (userId, userToUpdate) => {
	return new Promise((resolve, reject) => {
		User.findByIdAndUpdate(
			userId,
			{
				userName: userToUpdate.userName,
				password: userToUpdate.password,
			},
			(err) => {
				if (err) {
					reject(err);
				} else {
					resolve("Update User(DB)");
				}
			}
		);
	});
};
//-----------------------------------------------------
const deleteUserDB = (userId) => {
	return new Promise((resolve, reject) => {
		User.findByIdAndDelete(userId, (err) => {
			if (err) {
				reject(err);
			} else {
				resolve("User Deleted(DB)");
			}
		});
	});
};
//-----------------------------------------------------
module.exports = {
	getAllUsersDB,
	getUserByIdDB,
	addUserDB,
	updateUserDB,
	deleteUserDB,
};
