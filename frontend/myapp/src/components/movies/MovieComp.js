import React, { useState, useContext } from "react";
import { PermissionsContext } from "../UserPermissionsContext";
import MovieSubscriptionsComp from "./MovieSubscriptionsComp";
import axios from "axios";
import { Link } from "react-router-dom";

function MovieComp(props) {
	let [movie, setMovie] = useState(props.movieObj);
	let [UserPermissions, setUserPermissions] = useContext(PermissionsContext);
	let firstName = props.firstName;

	let editButtonToRender;
	let deleteButtonToRender;
	if (UserPermissions.permissions.includes("Update Movies")) {
		editButtonToRender = (
			<Link to={`/EditMovieComp/${firstName}/${movie._id}`}>
				<input type="button" value="Edit" />
			</Link>
		);
	}
	if (UserPermissions.permissions.includes("Delete Movies")) {
		deleteButtonToRender = (
			<input type="button" value="Delete" onClick={deleteMovieFunc} />
		);
	}

	async function deleteMovieFunc() {
		await axios.delete(
			`http://localhost:8001/cinema/subscriptions/movies/${movie._id}`
		);

		//MainComp כדי לעבור ל MoviesComp שיעביר ל AllMoviesComp מעביר ל
		props.isDelete(true);
	}
	return (
		<div style={{ border: "2px solid black" }}>
			<h3>
				{movie.name}, {movie.premiered.slice(0, 4)}
			</h3>
			<b>Genres:</b> {movie.genres.join(", ")}
			<br /> <br />
			<img src={movie.image} width="120px" />
			<br />
			<MovieSubscriptionsComp movieId={movie._id} firstName={firstName} />
			{editButtonToRender} {deleteButtonToRender}
		</div>
	);
}
export default MovieComp;
