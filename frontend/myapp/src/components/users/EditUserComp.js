import React, { useState, useEffect } from "react";
import axios from "axios";
import MainComp from "../login/MainComp";
function EditUserComp(props) {
	const firstName = props.match.params.firstName;
	const id = props.match.params.id;

	let [userDB, setUserDB] = useState({});
	let [userJson, setUserJson] = useState({});
	let [userPermissionJson, setUserPermissionJson] = useState({});

	let [firstName2, setFirstName2] = useState("");
	let [lastName, setLastName] = useState("");
	let [createdDate, setCreatedDate] = useState("");
	let [userName, setUserName] = useState("");
	let [sessionTimeOut, setSessionTimeOut] = useState("");
	let [permissions, setPermissions] = useState([]);

	useEffect(async () => {
		let userDBResp = await axios.get(
			`http://localhost:8001/cinema/usersDB/${id}`
		);
		let userJsonResp = await axios.get(
			`http://localhost:8001/cinema/usersJson/${id}`
		);

		let userPermissionJsonResp = await axios.get(
			`http://localhost:8001/cinema/permissionsJson/${id}`
		);

		setUserDB(userDBResp.data);
		setUserJson(userJsonResp.data);
		setUserPermissionJson(userPermissionJsonResp.data);

		setPermissions(userPermissionJsonResp.data.permissions);
		setFirstName2(userJsonResp.data.firstName);
		setLastName(userJsonResp.data.lastName);
		setCreatedDate(userJsonResp.data.createdDate);
		setUserName(userDBResp.data.userName);
		setSessionTimeOut(userJsonResp.data.sessionTimeOut);
	}, []);
	//----------------------------------------------------------------------------------
	function checkboxFunc(e) {
		if (e.target.checked === true) {
			let updatePermissions = [...permissions];
			updatePermissions.push(e.target.value);
			if (
				(e.target.value === "Create Subscriptions" ||
					e.target.value === "Update Subscriptions" ||
					e.target.value === "Delete Subscriptions") &&
				updatePermissions.includes("View Subscriptions") === false
			) {
				updatePermissions.push("View Subscriptions");
			}
			//-----------------------------------
			if (
				(e.target.value === "Create Movies" ||
					e.target.value === "Update Movies" ||
					e.target.value === "Delete Movies") &&
				updatePermissions.includes("View Movies") === false
			) {
				updatePermissions.push("View Movies");
			}
			setPermissions(updatePermissions);
			//-----------------------------------
		} else {
			let updatePermissions2 = [...permissions];
			let index = updatePermissions2.findIndex(
				(permission) => permission === e.target.value
			);
			updatePermissions2.splice(index, 1);

			if (e.target.value === "View Subscriptions") {
				if (updatePermissions2.includes("Create Subscriptions")) {
					let indexCS = updatePermissions2.findIndex(
						(permission) => permission === "Create Subscriptions"
					);
					updatePermissions2.splice(indexCS, 1);
				}
				if (updatePermissions2.includes("Update Subscriptions")) {
					let indexUS = updatePermissions2.findIndex(
						(permission) => permission === "Update Subscriptions"
					);
					updatePermissions2.splice(indexUS, 1);
				}
				if (updatePermissions2.includes("Delete Subscriptions")) {
					let indexDS = updatePermissions2.findIndex(
						(permission) => permission === "Delete Subscriptions"
					);
					updatePermissions2.splice(indexDS, 1);
				}
			}

			//-----------------------------------

			if (e.target.value === "View Movies") {
				if (updatePermissions2.includes("Create Movies")) {
					let indexCM = updatePermissions2.findIndex(
						(permission) => permission === "Create Movies"
					);
					updatePermissions2.splice(indexCM, 1);
				}
				if (updatePermissions2.includes("Update Movies")) {
					let indexUM = updatePermissions2.findIndex(
						(permission) => permission === "Update Movies"
					);
					updatePermissions2.splice(indexUM, 1);
				}
				if (updatePermissions2.includes("Delete Movies")) {
					let indexDM = updatePermissions2.findIndex(
						(permission) => permission === "Delete Movies"
					);
					updatePermissions2.splice(indexDM, 1);
				}
			}

			setPermissions(updatePermissions2);
		}
	}
	//----------------------------------------------------------------------------------
	async function updateFunc() {
		let updateUserDB = { ...userDB, userName: userName };
		await axios.put(`http://localhost:8001/cinema/usersDB/${id}`, updateUserDB);
		//---------------------------------------------------
		let updateUserJson = {
			...userJson,
			firstName: firstName2,
			lastName: lastName,
			createdDate: createdDate,
			sessionTimeOut: sessionTimeOut,
		};
		await axios.put(
			`http://localhost:8001/cinema/usersJson/${id}`,
			updateUserJson
		);
		//---------------------------------------------------
		let updateUserPermissionJson = {
			...userPermissionJson,
			permissions: permissions,
		};
		await axios.put(
			`http://localhost:8001/cinema/permissionsJson/${id}`,
			updateUserPermissionJson
		);
		//---------------------------------------------------
		props.history.push(`/ManageUsersComp/${firstName}`);
	}
	//----------------------------------------------------------------------------------
	return (
		<div>
			<MainComp firstName={firstName} />
			<h3>Hi {firstName}, Welcome To Edit User Comp</h3>
			First Name:{" "}
			<input
				type="text"
				value={firstName2}
				onChange={(e) => {
					setFirstName2(e.target.value);
				}}
			/>
			<br />
			Last Name:{" "}
			<input
				type="text"
				value={lastName}
				onChange={(e) => {
					setLastName(e.target.value);
				}}
			/>
			<br />
			Created Date:{" "}
			<input
				type="text"
				value={createdDate}
				onChange={(e) => {
					setCreatedDate(e.target.value);
				}}
			/>
			<br />
			UserName:{" "}
			<input
				type="text"
				value={userName}
				onChange={(e) => {
					setUserName(e.target.value);
				}}
			/>
			<br />
			Session Time Out:{" "}
			<input
				type="text"
				value={sessionTimeOut}
				onChange={(e) => {
					setSessionTimeOut(e.target.value);
				}}
			/>
			<br /> <br />
			Permissions:
			<br />
			<input
				type="checkbox"
				value="View Subscriptions"
				checked={permissions.includes("View Subscriptions")}
				onChange={checkboxFunc}
			/>
			View Subscriptions <br />
			<input
				type="checkbox"
				value="Create Subscriptions"
				checked={permissions.includes("Create Subscriptions")}
				onChange={checkboxFunc}
			/>
			Create Subscriptions <br />
			<input
				type="checkbox"
				value="Delete Subscriptions"
				checked={permissions.includes("Delete Subscriptions")}
				onChange={checkboxFunc}
			/>
			Delete Subscriptions <br />
			<input
				type="checkbox"
				value="Update Subscriptions"
				checked={permissions.includes("Update Subscriptions")}
				onChange={checkboxFunc}
			/>
			Update Subscriptions <br />
			<input
				type="checkbox"
				value="View Movies"
				checked={permissions.includes("View Movies")}
				onChange={checkboxFunc}
			/>
			View Movie <br />
			<input
				type="checkbox"
				value="Create Movies"
				checked={permissions.includes("Create Movies")}
				onChange={checkboxFunc}
			/>
			Create Movie <br />
			<input
				type="checkbox"
				value="Delete Movies"
				checked={permissions.includes("Delete Movies")}
				onChange={checkboxFunc}
			/>
			Delete Movie <br />
			<input
				type="checkbox"
				value="Update Movies"
				checked={permissions.includes("Update Movies")}
				onChange={checkboxFunc}
			/>
			Update Movie <br /> <br />
			<input type="button" value="Update" onClick={updateFunc} />{" "}
			<input
				type="button"
				value="Cancle"
				onClick={() => {
					props.history.push(`/ManageUsersComp/${firstName}`);
				}}
			/>
		</div>
	);
}
export default EditUserComp;
