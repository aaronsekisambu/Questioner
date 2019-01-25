const express = require('express');
const routesMeetup = express.Router();
const meetupsController  = require('../Controllers/meetups');
const auth = require('../middleware/authenticate/verify');

routesMeetup.route('/api/v1/meetups')
	.get(auth.verifyToken, meetupsController.getAllMeetups)
	.post(auth.verifyToken, meetupsController.postAMeetup);
	
routesMeetup.route('/api/v1/meetups/:id')
	.get(auth.verifyToken, meetupsController.getAMeetup)
	.put(auth.verifyToken, meetupsController.updateAMeetup)
	.delete(auth.verifyToken, meetupsController.deleteAMeetup);
	
module.exports = routesMeetup;