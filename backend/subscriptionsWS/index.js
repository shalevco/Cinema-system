const express = require("express");
const cors = require("cors");
const backendUtils = require("./backendUtils");

const membersController = require("./controllers/membersController");
const moviesController = require("./controllers/moviesController");
const subscriptionsController = require("./controllers/subscriptionsController");
require("./configs/subscriptionsDataBase");

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/subscriptions/members", membersController);
app.use("/subscriptions/movies", moviesController);
app.use("/subscriptions/subscriptions", subscriptionsController);

app.listen(
	8000,
	console.log("the Server is Running on port 8000"),
	backendUtils.insertMembersData(
		"http://localhost:8000/subscriptions/members",
		"https://jsonplaceholder.typicode.com/users"
	),
	backendUtils.insertMoviesData(
		"http://localhost:8000/subscriptions/movies",
		"https://api.tvmaze.com/shows"
	)
);
