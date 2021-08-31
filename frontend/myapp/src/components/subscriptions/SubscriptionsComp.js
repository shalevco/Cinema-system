import React, { useContext, useEffect, useState } from "react";
import { PermissionsContext } from "../UserPermissionsContext";
import AllMembersComp from "./AllMembersComp";
import MemberComp from "./MemberComp";
import MainComp from "../login/MainComp";

function SubscriptionsComp(props) {
	const firstName = props.match.params.firstName;

	let [UserPermissions, setUserPermissions] = useContext(PermissionsContext);
	let [isAllMembers, setIsAllMembers] = useState(true);
	let [isDelete, setIsDelete] = useState(false);

	let memberId = props.match.params.memberId;
	let membersToRender;

	if (memberId !== undefined) {
		membersToRender = (
			<MemberComp
				memberId={memberId}
				firstName={firstName}
				isDelete={(data) => {
					setIsDelete(data);
				}}
			/>
		);
	} else {
		if (
			isAllMembers === true &&
			UserPermissions.permissions.includes("View Subscriptions") === true
		) {
			membersToRender = <AllMembersComp firstName={firstName} />;
		} else if (
			UserPermissions.permissions.includes("View Subscriptions") === false
		) {
			membersToRender = `Dont have the right permissions (View Subscriptions, Create Subscriptions)`;
		}
	}

	function addMember() {
		if (
			membersToRender ===
			`Dont have the right permissions (View Subscriptions, Create Subscriptions)`
		) {
			alert(
				`Dont have the right permissions (View Subscriptions, Create Subscriptions)`
			);
		} else {
			props.history.push(`/AddMemberComp/${firstName}`);
		}
	}

	return (
		<div>
			<MainComp firstName={firstName} />
			<h3>Hi {firstName}, Welcome To Subscriptions Comp</h3>
			<input
				type="button"
				value="All Members"
				onClick={() => {
					setIsAllMembers(!isAllMembers);
				}}
			/>{" "}
			<input type="button" value="Add Member" onClick={addMember} />
			<br />
			{membersToRender}
		</div>
	);
}
export default SubscriptionsComp;
