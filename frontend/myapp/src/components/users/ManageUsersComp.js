import React, { useState } from "react";
import AllUsersComp from "./AllUsersComp";
import MainComp from "../login/MainComp";
function ManageUsersComp(props) {
	const firstName = props.match.params.firstName;
	let [isAllUsers, setIsAllUsers] = useState(true);
	let usersToRender;
	if (isAllUsers === true) {
		usersToRender = <AllUsersComp />;
	}
	return (
		<div>
			<MainComp firstName={firstName} />
			<h3>Hi {firstName}, Welcome To Manage Users Comp</h3>
			<input
				type="button"
				value="All Users"
				onClick={() => {
					setIsAllUsers(!isAllUsers);
				}}
			/>{" "}
			<input
				type="button"
				value="Add User"
				onClick={() => {
					props.history.push(`/AddUserComp/${firstName}`);
				}}
			/>
			{usersToRender}
		</div>
	);
}
export default ManageUsersComp;
