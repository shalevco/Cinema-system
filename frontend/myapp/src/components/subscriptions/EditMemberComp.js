import React, { useEffect, useState } from "react";
import axios from "axios";
import MainComp from "../login/MainComp";
function EditMemberComp(props) {
	const firstName = props.match.params.firstName;
	let memberId = props.match.params.memberId;
	let [name, setName] = useState("");
	let [email, setEmail] = useState("");
	let [city, setCity] = useState("");
	useEffect(async () => {
		let memberObj = await axios.get(
			`http://localhost:8001/cinema/subscriptions/members/${memberId}`
		);
		memberObj = memberObj.data;
		setName(memberObj.name);
		setEmail(memberObj.email);
		setCity(memberObj.city);
	}, []);

	async function updateMember() {
		let updateMember = { name: name, email: email, city: city };

		await axios.put(
			`http://localhost:8001/cinema/subscriptions/members/${memberId}`,
			updateMember
		);
		props.history.push(`/SubscriptionsComp/${firstName}`);
	}

	return (
		<div>
			<MainComp firstName={firstName} />
			<h3>
				Hi {firstName}, Welcome To Edit Member({name}) Comp
			</h3>
			Name:{" "}
			<input
				type="text"
				value={name}
				onChange={(e) => {
					setName(e.target.value);
				}}
			/>
			<br />
			Email:{" "}
			<input
				type="text"
				value={email}
				onChange={(e) => {
					setEmail(e.target.value);
				}}
			/>
			<br />
			City:{" "}
			<input
				type="text"
				value={city}
				onChange={(e) => {
					setCity(e.target.value);
				}}
			/>
			<br />
			<br />
			<input type="button" value="Update" onClick={updateMember} />{" "}
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
export default EditMemberComp;
