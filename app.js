import express, { json } from 'express';
import { json as _json, urlencoded } from 'body-parser';
const app = express();

// call express to json objects
app.use(json());
app.use(_json());
app.use(urlencoded({ extended: false }));

// Require different routes
import routesMeetup from './Server/routes/meetups';
app.use(routesMeetup);
import router from './Server/routes/users';
app.use(router);
import routesQuestions from './Server/routes/questions';

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
export default app;




