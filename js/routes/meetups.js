const express = require('express');
const routesMeetup = express.Router();
// call Joi for authotication
const Joi = require('joi');
const MeetupController  = require('../Controllers/meetupCotroller');
/*---------------------------------------------------------------------------- */
/* Meetups End Points
================================================================================= */
// shows all meetups available
routesMeetup.route('/questioner.com/api/v1/meetups')
.get(MeetupController.getAllMeetups)
.post(MeetupController.postAMeetup);
routesMeetup.route('/questioner.com/api/v1/meetups/:id/rsvp')
.post(MeetupController.postARsvp)
routesMeetup.route('/questioner.com/api/v1/meetups/upcoming')
.get(MeetupController.getAllUpcomingMeetups)
routesMeetup.route('/questioner.com/api/v1/meetups/:id')
.get(MeetupController.getAMeetup)
.put(MeetupController.updateAMeetup)
.delete(MeetupController.deleteAMeetup);
/* End of Meet up End points 
-----------------------------------------------------------------------------*/

module.exports = routesMeetup;