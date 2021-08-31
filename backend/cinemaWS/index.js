const express = require("express");
const cors = require("cors");
require("./configs/usersDataBase");

const permissionsJsonController = require("./controllers/permissionsJsonController");
const usersDBController = require("./controllers/usersDBController");
const usersJsonController = require("./controllers/usersJsonController");

const membersDAL = require("./DALs(subscriptions controllers)/membersDAL");
const moviesDAL = require("./DALs(subscriptions controllers)/moviesDAL");
const subscriptionsDAL = require("./DALs(subscriptions controllers)/subscriptionsDAL");

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/cinema/permissionsJson", permissionsJsonController);
app.use("/cinema/usersDB", usersDBController);
app.use("/cinema/usersJson", usersJsonController);

app.use("/cinema/subscriptions/members", membersDAL);
app.use("/cinema/subscriptions/movies", moviesDAL);
app.use("/cinema/subscriptions/subscriptions", subscriptionsDAL);

app.listen(8001, console.log("the Server is Running on port 8001"));
