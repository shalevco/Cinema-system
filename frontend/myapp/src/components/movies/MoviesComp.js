import React, { useContext, useEffect, useState } from "react";
import { PermissionsContext } from "../UserPermissionsContext";
import AllMoviesComp from "./AllMoviesComp";
import MainComp from "../login/MainComp";

function MoviesComp(props) {
	const firstName = props.match.params.firstName;
	let [UserPermissions, setUserPermissions] = useContext(PermissionsContext);
	let [isAllMovies, setIsAllMovies] = useState(true);
	let [isDelete, setIsDelete] = useState(false);
	let [findMovie, setFindMovie] = useState("");
	let [isFind, setIsFind] = useState(false);

	let movieWatchedName = props.match.params.movieWatchedName;
	useEffect(() => {
		if (movieWatchedName !== undefined) {
			setFindMovie(movieWatchedName);
			moviesToRender = (
				<AllMoviesComp
					firstName={firstName}
					findMovie={findMovie}
					isDelete={(data) => {
						setIsDelete(data);
					}}
				/>
			);
		}
		setTimeout(() => {
			setIsAllMovies(false);
			setTimeout(() => {
				setIsAllMovies(true);
			}, 1);
		}, 1);
	}, [movieWatchedName, isFind]);

	let moviesToRender;
	if (
		isAllMovies === true &&
		UserPermissions.permissions.includes("View Movies") === true
	) {
		moviesToRender = (
			<AllMoviesComp firstName={firstName} findMovie={findMovie} />
		);
	} else if (UserPermissions.permissions.includes("View Movies") === false) {
		moviesToRender = `Dont have the right permissions (View Movies, Create Movies)`;
	}

	function addMovieFunc() {
		if (
			moviesToRender ===
			`Dont have the right permissions (View Movies, Create Movies)`
		) {
			alert(`Dont have the right permissions (View Movies, Create Movies)`);
		} else {
			props.history.push(`/AddMovieComp/${firstName}`);
		}
	}

	return (
		<div>
			<MainComp firstName={firstName} />
			<h3>Hi {firstName}, Welcome To Movies Comp</h3>
			<input
				type="button"
				value="All Movies"
				onClick={() => {
					setIsAllMovies(!isAllMovies);
				}}
			/>{" "}
			<input type="button" value="Add Movie" onClick={addMovieFunc} />{" "}
			<b>Find Movie:</b>{" "}
			<input
				type="text"
				onChange={(e) => {
					setFindMovie(e.target.value.toLowerCase());
				}}
			/>{" "}
			<input
				type="button"
				value="Find"
				onClick={() => {
					setIsFind(!isFind);
				}}
			/>
			<br />
			{moviesToRender}
		</div>
	);
}
export default MoviesComp;
