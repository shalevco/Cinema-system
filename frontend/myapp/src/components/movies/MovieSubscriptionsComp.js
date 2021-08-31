import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function MovieSubscriptionsComp(props) {
	let [movieId, setMovieId] = useState(props.movieId);
	let [fullData, setFullData] = useState([]);

	useEffect(async () => {
		let subscriptions = await axios.get(
			"http://localhost:8001/cinema/subscriptions/subscriptions"
		);
		subscriptions = subscriptions.data;
		let members = await axios.get(
			"http://localhost:8001/cinema/subscriptions/members"
		);
		members = members.data;

		let movieSubs = subscriptions.filter((sub) => {
			let isSubWatched = false;
			sub.movies.forEach((movie) => {
				if (movie.movieId === movieId) {
					isSubWatched = true;
				}
			});
			if (isSubWatched) {
				return sub;
			}
		});
		let shapedFullData = movieSubs.map((sub) => {
			let date;
			sub.movies.forEach((movie) => {
				if (movie.movieId === movieId) {
					if (movie.date !== null) {
						date = movie.date.slice(0, 10);
					}
				}
			});
			let memberIndex = members.findIndex(
				(member) => member._id === sub.memberId
			);
			let member = members[memberIndex];
			return { memberId: sub.memberId, date: date, name: member.name };
		});
		setFullData(shapedFullData);
	}, []);

	let dataToRender = fullData.map((data) => {
		return (
			<li key={data.memberId}>
				<Link to={`/SubscriptionsComp/${props.firstName}/${data.memberId}`}>
					{data.name}
				</Link>
				, {data.date}
			</li>
		);
	});

	return (
		<div style={{ border: "2px solid black", width: "60%" }}>
			<h4> Subscriptions </h4>
			<ul>{dataToRender}</ul>
		</div>
	);
}
export default MovieSubscriptionsComp;
