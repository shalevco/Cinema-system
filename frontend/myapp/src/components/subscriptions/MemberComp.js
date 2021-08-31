import React, { useEffect, useState, useContext } from "react";
import { PermissionsContext } from "../UserPermissionsContext";
import axios from "axios";
import MemberSubscriptionsComp from "./MemberSubscriptionsComp";
import { Link } from "react-router-dom";

function MemberComp(props) {
	let memberId = props.memberId;
	let firstName = props.firstName;
	let [UserPermissions, setUserPermissions] = useContext(PermissionsContext);
	let [member, setMember] = useState({});

	let editButtonToRender;
	let deleteButtonToRender;
	if (UserPermissions.permissions.includes("Update Subscriptions")) {
		editButtonToRender = (
			<Link to={`/EditMemberComp/${firstName}/${memberId}`}>
				<input type="button" value="Edit" />
			</Link>
		);
	}
	if (UserPermissions.permissions.includes("Delete Subscriptions")) {
		deleteButtonToRender = (
			<input type="button" value="Delete" onClick={deleteMemberFunc} />
		);
	}
	async function deleteMemberFunc() {
		await axios.delete(
			`http://localhost:8001/cinema/subscriptions/members/${memberId}`
		);
		props.isDelete(true);
	}

	useEffect(async () => {
		let member = await axios.get(
			`http://localhost:8001/cinema/subscriptions/members/${memberId}`
		);
		member = member.data;
		setMember(member);
	}, []);
	return (
		<div style={{ border: "2px solid black" }}>
			<h3>{member.name}</h3>
			Email: {member.email} <br />
			City: {member.city} <br />
			{editButtonToRender} {deleteButtonToRender} <br /> <br />
			<MemberSubscriptionsComp memberId={memberId} firstName={firstName} />
		</div>
	);
}
export default MemberComp;
