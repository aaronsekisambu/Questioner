const express = require('express');
const routesMeetup = express.Router();
const meetupsController  = require('../controllers/meetups');
/*---------------------------------------------------------------------------- */
/* Meetups End Points
================================================================================= */
// shows all meetups available
routesMeetup.route('/api/v1/meetups')
	.get(meetupsController.getAllMeetups)
	.post(meetupsController.postAMeetup);
	
routesMeetup.route('/api/v1/meetups/:id')
	.get(meetupsController.getAMeetup)
	.put(meetupsController.updateAMeetup)
	.delete(meetupsController.deleteAMeetup);
/* End of Meet up End points 
-----------------------------------------------------------------------------*/
module.exports = routesMeetup;