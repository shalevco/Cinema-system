const axios = require("axios");

const insertMembersData = async (to, from) => {
	let correntMembers = await (await axios.default.get(to)).data;
	if (correntMembers.length === 0) {
		let users = await (await axios.default.get(from)).data;
		let members = users.map((user) => {
			return {
				name: user.name,
				email: user.email,
				city: user.address.city,
			};
		});
		members.forEach((member) => {
			axios.default.post(to, member);
		});
	}
};
//-----------------------------------------------------
const insertMoviesData = async (to, from) => {
	let correntMovies = await (await axios.default.get(to)).data;
	if (correntMovies.length === 0) {
		let moviesData = await (await axios.default.get(from)).data;
		let movies = moviesData.map((movie) => {
			return {
				name: movie.name,
				genres: movie.genres,
				image: movie.image.medium,
				premiered: movie.premiered,
			};
		});
		movies.forEach((movie) => {
			axios.default.post(to, movie);
		});
	}
};

module.exports = { insertMembersData, insertMoviesData };
