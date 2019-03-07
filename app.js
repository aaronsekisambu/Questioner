import express, { json } from 'express';
import { json as _json, urlencoded } from 'body-parser';
import cors from 'cors';
import routesQuestions from './server/routes/questions';
import router from './server/routes/users';
import routesMeetup from './server/routes/meetups';

const app = express();

// call express to json objects
app.use(cors());
app.use(json());
app.use(_json());
app.use(urlencoded({ extended: false }));

// Require different routes
app.use(routesMeetup);
app.use(router);

app.use(routesQuestions);
//Root of Endpoint for all users
app.get('/', (req, res)=> {
  res.status(200).send({
    status: 200,
    message: 'This is the root directory, You have not made any request'});
});

// check on wrong input
app.all('*', (req, res) => {
  res.status(404).send({
    status: 404,
    error: 'Page not found. Please try again'});
});
export default app;




