import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { IdContext } from "../UserIdContext";
import { PermissionsContext } from "../UserPermissionsContext";

function LoginComp(props) {
	let [userName, setUserName] = useState("");
	let [password, setPassword] = useState("");

	let [UserLoginId, setUserLoginId] = useContext(IdContext);
	let [UserPermissions, setUserPermissions] = useContext(PermissionsContext);

	async function loginClicked() {
		let usersDB = await axios.get("http://localhost:8001/cinema/usersDB");
		usersDB = usersDB.data;

		for (let i = 0; i < usersDB.length; i++) {
			if (
				usersDB[i].userName === userName &&
				usersDB[i].password === password &&
				usersDB[i].password !== ""
			) {
				let userId = usersDB[i]._id;
				setUserLoginId(userId);
				let userJson = await axios.get(
					`http://localhost:8001/cinema/usersJson/${usersDB[i]._id}`
				);
				userJson = userJson.data;
				let userPermissionsResp = await axios.get(
					`http://localhost:8001/cinema/permissionsJson/${usersDB[i]._id}`
				);

				setUserPermissions(userPermissionsResp.data);

				let firstName = userJson.firstName;

				let sessionTimeOut = userJson.sessionTimeOut;
				sessionTimeOut = sessionTimeOut * 1000 * 60;
				if (sessionTimeOut) {
					setTimeout(() => {
						props.history.push("/");
					}, sessionTimeOut);
				}

				props.history.push(`/MainComp/${firstName}`);
				return;
			}
		}
		alert("The User Name / Password Is Uncorrect");
	}

	return (
		<div>
			<h3>Log In Page</h3>
			User Name:{" "}
			<input
				type="text"
				value={userName}
				onChange={(e) => {
					setUserName(e.target.value);
				}}
			/>
			<br />
			Password:{" "}
			<input
				type="password"
				value={password}
				onChange={(e) => {
					setPassword(e.target.value);
				}}
			/>
			<br />
			<input type="button" value="Login" onClick={loginClicked} />
			<br />
			New User? <Link to="/CreateAcountComp">Create Acount</Link>
		</div>
	);
}
export default LoginComp;
