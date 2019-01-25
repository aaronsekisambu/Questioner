const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// call express to json objects
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Require different routes
const routesMeetup  = require('./Server/routes/meetups');
app.use(routesMeetup);
const router = require('./Server/routes/users');
app.use(router);
const routesQuestions  = require('./Server/routes/questions');

app.use(routesQuestions);
//Root of Endpoint for all users
app.get('/', (req, res)=> {
	res.status(200).send({
		status: 200, 
		message: 'This is the root directory, You have not made any request'});
});

/* General Page Return error
============================================================================== */
// check on wrong input
app.all('*', (req, res) => {
	res.status(404).send({
		status: 404,
		error: 'Page not found. Please try again'});
});
module.exports = app;




