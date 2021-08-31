import React, { useEffect, useState } from "react";
import axios from "axios";
import MainComp from "../login/MainComp";
function EditMovieComp(props) {
	const firstName = props.match.params.firstName;
	const movieId = props.match.params.movieId;
	let [movie, setMovie] = useState({});
	let [movieName, setMovieName] = useState("");
	let [movieGenres, setMovieGenres] = useState([]);
	let [movieImageUrl, setMovieImageUrl] = useState("");
	let [moviePremiered, setMoviePremiered] = useState("");
	useEffect(async () => {
		let movie = await axios.get(
			`http://localhost:8001/cinema/subscriptions/movies/${movieId}`
		);
		movie = movie.data;
		setMovie(movie);
		setMovieName(movie.name);
		setMovieGenres(movie.genres);
		setMovieImageUrl(movie.image);
		setMoviePremiered(movie.premiered);
	}, []);

	async function updateMovie() {
		let updateMovie = {
			name: movieName,
			genres: movieGenres,
			image: movieImageUrl,
			premiered: moviePremiered,
		};
		await axios.put(
			`http://localhost:8001/cinema/subscriptions/movies/${movieId}`,
			updateMovie
		);
		props.history.push(`/MoviesComp/${firstName}`);
	}

	return (
		<div>
			<MainComp firstName={firstName} />
			<h3>
				Hi {firstName}, Welcome To Edit Movie ({movie.name}) Comp
			</h3>
			Name:{" "}
			<input
				type="text"
				value={movieName}
				onChange={(e) => {
					setMovieName(e.target.value);
				}}
			/>{" "}
			<br />
			Genres:{" "}
			<input
				type="text"
				value={movieGenres}
				onChange={(e) => {
					setMovieGenres(e.target.value);
				}}
			/>{" "}
			<br />
			Image Url:{" "}
			<input
				type="text"
				value={movieImageUrl}
				onChange={(e) => {
					setMovieImageUrl(e.target.value);
				}}
			/>{" "}
			<br />
			Premiered:{" "}
			<input
				type="date"
				value={moviePremiered.slice(0, 10)}
				onChange={(e) => {
					setMoviePremiered(e.target.value);
				}}
			/>{" "}
			<br />
			<input type="button" value="Update" onClick={updateMovie} />{" "}
			<input
				type="button"
				value="Cancel"
				onClick={() => {
					props.history.push(`/MoviesComp/${firstName}`);
				}}
			/>
		</div>
	);
}
export default EditMovieComp;
