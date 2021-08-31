import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function UserComp(props) {
	let id = props.userId;
	let [userDB, setUserDB] = useState({});
	let [userJson, setUserJson] = useState({});
	let [userPermissionJson, setUserPermissionJson] = useState({});
	useEffect(async () => {
		let userDB = await axios.get(`http://localhost:8001/cinema/usersDB/${id}`);
		let userJson = await axios.get(
			`http://localhost:8001/cinema/usersJson/${id}`
		);
		let userPermissionJson = await axios.get(
			`http://localhost:8001/cinema/permissionsJson/${id}`
		);
		setUserDB(userDB.data);
		setUserJson(userJson.data);
		setUserPermissionJson(userPermissionJson.data);
	}, []);
	async function deleteFunc() {
		await axios.delete(`http://localhost:8001/cinema/usersDB/${id}`);
		await axios.delete(`http://localhost:8001/cinema/usersJson/${id}`);
		await axios.delete(`http://localhost:8001/cinema/permissionsJson/${id}`);
		props.trig();
	}
	let permissionsToRender;
	if (userPermissionJson.permissions !== undefined) {
		permissionsToRender = userPermissionJson.permissions.join(", ");
	}

	return (
		<div style={{ border: "2px solid black" }}>
			Name: {userJson.firstName}
			<br />
			User Name: {userDB.userName}
			<br />
			Session time out: {userJson.sessionTimeOut}
			<br />
			Created Date: {userJson.createdDate}
			<br />
			Permissions: {permissionsToRender}
			<br /> <br />
			<Link to={`/EditUserComp/${userJson.firstName}/${id}`}>
				<input type="button" value="Edit" />
			</Link>
			<input type="button" value="Delete" onClick={deleteFunc} />
		</div>
	);
}
export default UserComp;
