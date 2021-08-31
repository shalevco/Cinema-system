import React, { useEffect, useState } from "react";
import axios from "axios";
import MemberComp from "./MemberComp";
function AllMembersComp(props) {
	let [memberToRender, setMemberToRender] = useState("");
	let [isDelete, setIsDelete] = useState(false);

	useEffect(async () => {
		let members = await axios.get(
			"http://localhost:8001/cinema/subscriptions/members"
		);
		members = members.data;
		setMemberToRender(
			members.map((member) => {
				return (
					<MemberComp
						key={member._id}
						memberId={member._id}
						firstName={props.firstName}
						isDelete={() => {
							setIsDelete(!isDelete);
						}}
					/>
				);
			})
		);
	}, [isDelete]);

	return (
		<div>
			<br />
			{memberToRender}
		</div>
	);
}
export default AllMembersComp;
