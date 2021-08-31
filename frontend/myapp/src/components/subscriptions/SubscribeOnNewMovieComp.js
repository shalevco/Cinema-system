import React, { useEffect, useState } from "react";
import axios from "axios";
function SubscribeOnNewMovieComp(props) {
	let firstName = props.firstName;
	let memberId = props.memberId;
	let moviesWatched = props.moviesWatched;
	let [unWatchedMovies, setUnWatchedMovies] = useState("");
	let [movieId, setMovieId] = useState("");
	let [date, setDate] = useState("");

	useEffect(async () => {
		let movies = await axios.get(
			`http://localhost:8001/cinema/subscriptions/movies`
		);
		movies = movies.data;

		let shapedMovies = movies;
		if (moviesWatched.length >= 1) {
			movies.map((movie) => {
				moviesWatched.map((movieWatched) => {
					if (movie._id === movieWatched.id) {
						let index = shapedMovies.findIndex(
							(movie) => movie._id === movieWatched.id
						);
						shapedMovies.splice(index, 1);
						setUnWatchedMovies(shapedMovies);
					}
				});
			});
		} else {
			setUnWatchedMovies(shapedMovies);
		}
	}, []);
	let dataToRender;
	if (unWatchedMovies) {
		dataToRender = unWatchedMovies.map((movie) => {
			return (
				<option key={movie._id} value={movie._id}>
					{movie.name}
				</option>
			);
		});
	}
	async function subscribeClicked() {
		if (moviesWatched.length >= 1) {
			let subscriptions = await axios.get(
				"http://localhost:8001/cinema/subscriptions/subscriptions"
			);
			subscriptions = subscriptions.data;
			subscriptions.forEach(async (sub) => {
				if (sub.memberId === memberId) {
					sub = {
						...sub,
						movies: [...sub.movies, { movieId: movieId, date: date }],
					};
					await axios.put(
						`http://localhost:8001/cinema/subscriptions/subscriptions/${sub._id}`,
						sub
					);
				}
			});
			props.isShow(false);
			props.trig();
		} else {
			let newSubscribe = {
				memberId: memberId,
				movies: [{ movieId: movieId, date: date }],
			};
			await axios.post(
				"http://localhost:8001/cinema/subscriptions/subscriptions",
				newSubscribe
			);
			props.isShow(false);
			props.trig();
		}
	}
	return (
		<div style={{ border: "2px solid red", width: "50%" }}>
			<b>Add New Movie</b> <br />
			<select
				onChange={(e) => {
					setMovieId(e.target.value);
				}}
			>
				<option>Choose a movie</option>
				{dataToRender}
			</select>
			<br />
			<input
				type="date"
				onChange={(e) => {
					setDate(e.target.value);
				}}
			/>{" "}
			<input type="button" value="Subscribe" onClick={subscribeClicked} />
			<br />
		</div>
	);
}

export default SubscribeOnNewMovieComp;
