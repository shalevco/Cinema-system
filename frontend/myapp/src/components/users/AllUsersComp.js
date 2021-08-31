import React, { useEffect, useState } from "react";
import axios from "axios";
import UserComp from "./UserComp";
function AllUsersComp() {
	let [userToRender, setUserToRender] = useState("");
	const [trigger, setTrigger] = useState(false);

	useEffect(async () => {
		let usersDB = await axios.get("http://localhost:8001/cinema/usersDB");
		usersDB = usersDB.data;

		setUserToRender(
			usersDB.map((user) => {
				if (user._id !== "60d475817ed72aeefa537c21") {
					return (
						<UserComp
							key={user._id}
							userId={user._id}
							trig={() => setTrigger(!trigger)}
						/>
					);
				}
			})
		);
	}, [trigger]);

	return <div>{userToRender}</div>;
}
export default AllUsersComp;
