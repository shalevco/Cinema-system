import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieComp from "./MovieComp";
function AllMoviesComp(props) {
	let [movieToRender, setMovieToRender] = useState("");
	let [isDelete, setIsDelete] = useState(false);
	let firstName = props.firstName;
	useEffect(async () => {
		let movies = await axios.get(
			"http://localhost:8001/cinema/subscriptions/movies"
		);
		movies = movies.data;
		setMovieToRender(
			movies.map((movie) => {
				if (movie.name.toLowerCase().includes(props.findMovie)) {
					return (
						<MovieComp
							key={movie._id}
							movieObj={movie}
							firstName={firstName}
							isDelete={() => {
								setIsDelete(!isDelete);
							}}
						/>
					);
				}
			})
		);
	}, [isDelete]);

	return <div>{movieToRender}</div>;
}
export default AllMoviesComp;
