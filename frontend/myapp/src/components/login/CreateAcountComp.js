import axios from "axios";
import React, { useState } from "react";

function CreateAcountComp(props) {
	let [userName, setUserName] = useState("");
	let [password, setPassword] = useState("");

	async function createClicked() {
		let usersDB = await axios.get("http://localhost:8001/cinema/usersDB");
		usersDB = usersDB.data;

		for (let i = 0; i < usersDB.length; i++) {
			if (usersDB[i].userName === userName) {
				let updateUser = {
					...usersDB[i],
					password: password,
				};
				axios.put(
					`http://localhost:8001/cinema/usersDB/${usersDB[i]._id}`,
					updateUser
				);
				props.history.push("/");
				return;
			}
		}
		alert("The userName is not exist in the data base");
	}

	return (
		<div>
			<h3>Create An Acount</h3>
			User Name:{" "}
			<input
				type="text"
				onChange={(e) => {
					setUserName(e.target.value);
				}}
			/>
			<br />
			Password:{" "}
			<input
				type="text"
				onChange={(e) => {
					setPassword(e.target.value);
				}}
			/>
			<br />
			<input type="button" value="Create" onClick={createClicked} />{" "}
			<input
				type="button"
				value="Cancel"
				onClick={() => {
					props.history.push("/");
				}}
			/>
		</div>
	);
}
export default CreateAcountComp;
