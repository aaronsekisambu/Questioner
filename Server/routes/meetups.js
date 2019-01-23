const express = require('express');
const routesMeetup = express.Router();
const meetupsController  = require('../controllers/meetupsCotroller');
/*---------------------------------------------------------------------------- */
/* Meetups End Points
================================================================================= */
// shows all meetups available
routesMeetup.route('/api/v1/meetups')
	.get(meetupsController.getAllMeetups)
	.post(meetupsController.postAMeetup);
routesMeetup.route('/api/v1/meetups/:id/rsvps')
	.post(meetupsController.postARsvp);
routesMeetup.route('/api/v1/meetups/upcoming')
	.get(meetupsController.getAllUpcomingMeetups);
routesMeetup.route('/api/v1/meetups/:id')
	.get(meetupsController.getAMeetup)
	.put(meetupsController.updateAMeetup)
	.delete(meetupsController.deleteAMeetup);
/* End of Meet up End points 
-----------------------------------------------------------------------------*/
module.exports = routesMeetup;