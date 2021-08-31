import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { PermissionsContext } from "../UserPermissionsContext";
import SubscribeOnNewMovieComp from "./SubscribeOnNewMovieComp";

function MemberSubscriptionsComp(props) {
	let [UserPermissions, setUserPermissions] = useContext(PermissionsContext);
	let [memberSubs, setMemberSubs] = useState([]);
	const [moviesWatched, setMoviesWatched] = useState([]);
	let [isSubscribe, setIsSubscribe] = useState(false);
	const [trigger, setTrigger] = useState(false);

	let firstName = props.firstName;
	let memberId = props.memberId;

	useEffect(async () => {
		let subscriptions = await axios.get(
			"http://localhost:8001/cinema/subscriptions/subscriptions"
		);
		subscriptions = subscriptions.data;
		let subsOfMember = subscriptions.find((sub) => sub.memberId === memberId);
		subsOfMember && setMemberSubs(subsOfMember.movies);
	}, [trigger]);

	useEffect(async () => {
		let moviesWatchedProms;
		if (memberSubs) {
			moviesWatchedProms = memberSubs.map(async (sub) => {
				let movie = await axios.get(
					`http://localhost:8001/cinema/subscriptions/movies/${sub.movieId}`
				);
				movie = movie.data;
				let movieWatched = {
					id: movie._id,
					name: movie.name,
					date: sub.date,
				};
				return movieWatched;
			});
			let moviesWatched = await Promise.all([...moviesWatchedProms]);
			setMoviesWatched(moviesWatched);
		}
	}, [memberSubs]);

	let dataToRender;
	dataToRender = moviesWatched.map((movieWatched) => {
		if (UserPermissions.permissions.includes("View Movies")) {
			let movieWatchedDate;
			if (movieWatched.date !== null) {
				movieWatchedDate = movieWatched.date.slice(0, 10);
			}
			return (
				<li key={movieWatched.movieId}>
					<Link
						to={`/MoviesComp/${firstName}/${movieWatched.name.toLowerCase()}`}
					>
						{movieWatched.name}
					</Link>{" "}
					, {movieWatchedDate}
				</li>
			);
		}
	});

	let subscribeToRender;
	if (isSubscribe) {
		subscribeToRender = (
			<SubscribeOnNewMovieComp
				memberId={memberId}
				moviesWatched={moviesWatched}
				firstName={firstName}
				trig={() => setTrigger(!trigger)}
				isShow={(data) => {
					setIsSubscribe(data);
				}}
			/>
		);
	}
	return (
		<div style={{ border: "2px solid red", width: "80%" }}>
			<b>Movies Watched</b> <br />
			<input
				type="button"
				value="Subscribe to new movie"
				onClick={() => {
					setIsSubscribe(!isSubscribe);
				}}
			/>
			<br />
			{subscribeToRender}
			<br />
			{dataToRender}
		</div>
	);
}
export default MemberSubscriptionsComp;
