const Member = require("../models/memberModel");
const SubscriptionsBL = require("./subscriptionsBL");

const getAllMembers = () => {
	return new Promise((resolve, reject) => {
		Member.find({}, (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};
//-----------------------------------------------------
const getMemberById = (memberId) => {
	return new Promise((resolve, reject) => {
		Member.findById(memberId, (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};
//-----------------------------------------------------
const addMember = (newMember) => {
	return new Promise((resolve, reject) => {
		let memberToSave = new Member({
			name: newMember.name,
			email: newMember.email,
			city: newMember.city,
		});
		memberToSave.save((err) => {
			if (err) {
				reject(err);
			} else {
				resolve(memberToSave);
			}
		});
	});
};
//-----------------------------------------------------
const updateMember = (memberId, memberToUpdate) => {
	return new Promise((resolve, reject) => {
		Member.findByIdAndUpdate(
			memberId,
			{
				name: memberToUpdate.name,
				email: memberToUpdate.email,
				city: memberToUpdate.city,
			},
			(err) => {
				if (err) {
					reject(err);
				} else {
					resolve("Update Member");
				}
			}
		);
	});
};
//-----------------------------------------------------
const deleteMember = async (memberId) => {
	await deleteMemberFromSubscriptions(memberId);
	return new Promise((resolve, reject) => {
		Member.findByIdAndDelete(memberId, (err) => {
			if (err) {
				reject(err);
			} else {
				resolve("Member Deleted");
			}
		});
	});
};
//-----------------------------------------------------
const deleteMemberFromSubscriptions = async (memberId) => {
	let subscriptions = await SubscriptionsBL.getAllSubscriptions();
	subscriptions.forEach(async (sub) => {
		if (sub.memberId == memberId) {
			SubscriptionsBL.deleteSubscription(sub._id);
		}
	});
};
//-----------------------------------------------------

module.exports = {
	getAllMembers,
	getMemberById,
	addMember,
	updateMember,
	deleteMember,
};
