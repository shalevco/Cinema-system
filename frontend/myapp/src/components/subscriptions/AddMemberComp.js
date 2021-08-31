import React, { useState } from "react";
import axios from "axios";
import MainComp from "../login/MainComp";
function AddMemberComp(props) {
	const firstName = props.match.params.firstName;
	let [name, setName] = useState("");
	let [email, setEmail] = useState("");
	let [city, setCity] = useState("");

	async function saveMember() {
		let newMember = { name: name, email: email, city: city };

		await axios.post(
			`http://localhost:8001/cinema/subscriptions/members`,
			newMember
		);
		props.history.push(`/SubscriptionsComp/${firstName}`);
	}

	return (
		<div>
			<MainComp firstName={firstName} />
			<h3>Hi {firstName}, Welcome To Add Member Comp</h3>
			Name:{" "}
			<input
				type="text"
				onChange={(e) => {
					setName(e.target.value);
				}}
			/>
			<br />
			Email:{" "}
			<input
				type="text"
				onChange={(e) => {
					setEmail(e.target.value);
				}}
			/>
			<br />
			City:{" "}
			<input
				type="text"
				onChange={(e) => {
					setCity(e.target.value);
				}}
			/>
			<br />
			<br />
			<input type="button" value="Save" onClick={saveMember} />{" "}
			<input
				type="button"
				value="Cancel"
				onClick={() => {
					props.history.push(`/SubscriptionsComp/${firstName}`);
				}}
			/>
		</div>
	);
}
export default AddMemberComp;
