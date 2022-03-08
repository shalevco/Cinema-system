# Cinema-system
A website for cinema employees to manage their movies, customers and employees.

To run the app:
1. Install dependencies - npm install in CinemaWS, SubscriptionsWS and the frontend.
2. In mongoDB create a "subscriptionsDB" Database and the collections "members", "movies", "subscriptions".
3. In mongoDB create a "usersDB" Database and the collection "users". In the collection copy and paste this JSON to a document: 

{
    "_id" : ObjectId("60d475817ed72aeefa537c21"),
    "userName" : "shalevco",
    "password" : "shalevco123"
}


4. To start the servers, go to: backend folder --> cinemaWS (open in integrated Terminal) - node index.js, SubscriptionsWS - node index.js.   
5. To start the website, go to: FrontEnd folder --> myapp (open in integrated Terminal) - npm start.
6. To login enter username: "shalevco", and paswword: "shalevco123" 

*Only the admin(shalevco) can manage other users and create new ones. After a new user has been created, the user needs to go to the create account page from the login page, enter the username, and choose any password he would like.

