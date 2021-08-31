import React, { useState } from "react";
import axios from "axios";
import MainComp from "../login/MainComp";
function AddMovieComp(props) {
	const firstName = props.match.params.firstName;
	let [name, setName] = useState("");
	let [genres, setGenres] = useState([]);
	let [imageUrl, setImageUrl] = useState("");
	let [premiered, setPremiered] = useState("");

	async function addNewMovie() {
		let newMovie = {
			name: name,
			genres: genres,
			image: imageUrl,
			premiered: premiered,
		};
		await axios.post(
			"http://localhost:8001/cinema/subscriptions/movies",
			newMovie
		);
		props.history.push(`/MoviesComp/${firstName}`);
	}

	return (
		<div>
			<MainComp firstName={firstName} />
			<h3>Hi {firstName}, Welcome To Add Movie Comp</h3>
			Name:{" "}
			<input
				type="text"
				onChange={(e) => {
					setName(e.target.value);
				}}
			/>{" "}
			<br />
			Genres:{" "}
			<input
				type="text"
				onChange={(e) => {
					setGenres(e.target.value.split(","));
				}}
			/>{" "}
			<br />
			Image Url:{" "}
			<input
				type="text"
				onChange={(e) => {
					setImageUrl(e.target.value);
				}}
			/>{" "}
			<br />
			Premiered:{" "}
			<input
				type="date"
				onChange={(e) => {
					setPremiered(e.target.value);
				}}
			/>{" "}
			<br />
			<input type="button" value="Save" onClick={addNewMovie} />{" "}
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
export default AddMovieComp;
