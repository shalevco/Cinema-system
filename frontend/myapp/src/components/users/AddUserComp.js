import axios from "axios";
import React, { useState } from "react";
import MainComp from "../login/MainComp";
function AddUserComp(props) {
	const firstName = props.match.params.firstName;

	let [firstName2, setFirstName2] = useState("");
	let [lastName, setLastName] = useState("");
	let [userName, setUserName] = useState("");
	let [sessionTimeOut, setSessionTimeOut] = useState("");
	let [permissions, setPermissions] = useState([]);

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

	async function saveFunc() {
		let saveUserDB = { userName: userName, password: "" };
		await axios.post("http://localhost:8001/cinema/usersDB", saveUserDB);

		let usersDB = await axios.get("http://localhost:8001/cinema/usersDB");
		usersDB = usersDB.data;
		let newId = usersDB[usersDB.length - 1]._id;

		let d = new Date();
		d = d.toLocaleDateString();

		let saveUserJson = {
			id: newId,
			firstName: firstName2,
			lastName: lastName,
			createdDate: d,
			sessionTimeOut: parseInt(sessionTimeOut, 10),
		};
		await axios.post("http://localhost:8001/cinema/usersJson", saveUserJson);

		let savePermissionsJson = { id: newId, permissions: permissions };
		await axios.post(
			"http://localhost:8001/cinema/permissionsJson",
			savePermissionsJson
		);

		props.history.push(`/ManageUsersComp/${firstName}`);
	}
	return (
		<div>
			<MainComp firstName={firstName} />
			<h3>Hi {firstName}, Welcome To Add User Comp</h3>
			First Name:{" "}
			<input
				type="text"
				onChange={(e) => {
					setFirstName2(e.target.value);
				}}
			/>
			<br />
			Last Name:{" "}
			<input
				type="text"
				onChange={(e) => {
					setLastName(e.target.value);
				}}
			/>
			<br />
			UserName:{" "}
			<input
				type="text"
				onChange={(e) => {
					setUserName(e.target.value);
				}}
			/>
			<br />
			Session Time Out:{" "}
			<input
				type="number"
				onChange={(e) => {
					setSessionTimeOut(e.target.value);
				}}
			/>
			<br /> <br />
			Permissions:
			<br />
			<input
				type="checkbox"
				checked={permissions.includes("View Subscriptions")}
				value="View Subscriptions"
				onChange={checkboxFunc}
			/>
			View Subscriptions <br />
			<input
				type="checkbox"
				checked={permissions.includes("Create Subscriptions")}
				value="Create Subscriptions"
				onChange={checkboxFunc}
			/>
			Create Subscriptions <br />
			<input
				type="checkbox"
				checked={permissions.includes("Delete Subscriptions")}
				value="Delete Subscriptions"
				onChange={checkboxFunc}
			/>
			Delete Subscriptions <br />
			<input
				type="checkbox"
				checked={permissions.includes("Update Subscriptions")}
				value="Update Subscriptions"
				onChange={checkboxFunc}
			/>
			Update Subscriptions <br />
			<input
				type="checkbox"
				checked={permissions.includes("View Movies")}
				value="View Movies"
				onChange={checkboxFunc}
			/>
			View Movie <br />
			<input
				type="checkbox"
				checked={permissions.includes("Create Movies")}
				value="Create Movies"
				onChange={checkboxFunc}
			/>
			Create Movie <br />
			<input
				type="checkbox"
				checked={permissions.includes("Delete Movies")}
				value="Delete Movies"
				onChange={checkboxFunc}
			/>
			Delete Movie <br />
			<input
				type="checkbox"
				checked={permissions.includes("Update Movies")}
				value="Update Movies"
				onChange={checkboxFunc}
			/>
			Update Movie <br /> <br />
			<input type="button" value="Save" onClick={saveFunc} />{" "}
			<input
				type="button"
				value="Cancel"
				onClick={() => {
					props.history.push(`/ManageUsersComp/${firstName}`);
				}}
			/>
		</div>
	);
}
export default AddUserComp;
