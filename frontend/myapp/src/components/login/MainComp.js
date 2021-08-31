import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IdContext } from "../UserIdContext";

function MainComp(props) {
	let text;
	let firstName;
	if (props.firstName !== undefined) {
		firstName = props.firstName;
	} else {
		firstName = props.match.params.firstName;
		text = <h3>Hi {firstName}, Welcome To Main Comp</h3>;
	}

	let adminButtonToRender = "";

	let [UserLoginId, setUserLoginId] = useContext(IdContext);
	if (UserLoginId === "60d475817ed72aeefa537c21") {
		adminButtonToRender = (
			<Link to={`/ManageUsersComp/${firstName}`}>
				<input type="button" value="Users Management" />
			</Link>
		);
	}

	return (
		<div>
			{text}
			<Link to={`/MoviesComp/${firstName}`}>
				<input type="button" value="Movies" />
			</Link>{" "}
			<Link to={`/SubscriptionsComp/${firstName}`}>
				<input type="button" value="Subscriptions" />
			</Link>{" "}
			{adminButtonToRender}{" "}
			<Link to={"/"}>
				<input type="button" value="Log Out" />
			</Link>
			<br />
		</div>
	);
}
export default MainComp;
