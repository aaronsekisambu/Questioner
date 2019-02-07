import express from 'express';

import meetupsController from '../Controllers/meetups';

import auth from '../middleware/authenticate/verify';

const routesMeetup = express.Router();
routesMeetup.route('/api/v1/meetups')
	.get(auth.verifyToken, meetupsController.getAllMeetups)
	.post(auth.verifyToken, meetupsController.postAMeetup);
	
routesMeetup.route('/api/v1/meetups/:id')
	.get(auth.verifyToken, meetupsController.getAMeetup)
	.put(auth.verifyToken, meetupsController.updateAMeetup)
	.delete(auth.verifyToken, meetupsController.deleteAMeetup);

export default routesMeetup;