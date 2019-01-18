const MeetupModel = require('../models/meetupModels');
const Validate = require('../helpers/utils');


class MeetupController {
	getAllMeetups (req, res) {
		const meetups = MeetupModel._meetups;
		res.status(200).send({
			status: 200,
			data: meetups
		});
	}
	getAllUpcomingMeetups (req, res) {
		const meetups = MeetupModel._meetups;
		const upcoming = 'then';
		const today = [];

		for(let i = 0; i !== meetups[i].length; i++) {
			if (!upcoming === meetups[i].happeningOn) {
				today.push(meetups[i]);
			}
			return res.status(400).send({
				status: 400,
				error: 'Currently no upcoming meetup(s)'
			});
		}
		return res.send({
			status: 200,
			data: meetups
		});

	}

	getAMeetup (req, res) {
		const meetups = MeetupModel._meetups;
		const meetup = meetups.find(ele => ele.id === parseInt(req.params.id));
		if (!meetup) {
			return res.status(404).send({
				status: 404, 
				error: 'Invalid Meetup or Meetup not created'});
		}
		return res.send({
			status: 200, 
			data: meetup});
        
	}
	postAMeetup (req, res) {
		const meetups = MeetupModel._meetups;
		const validateMeetup = Validate._validateMeetup;
		const {error} = validateMeetup(req.body);
		if(error) {
			return res.status(400).send({
				status: 400,
				error:  error.details
			});
		}else{
			const meetup = {
				id: meetups.length + 1,
				location: req.body.location,
				topic: req.body.topic,
				happeningOn: 'Now',
				tags: req.body.tags,
			};
			meetups.push(meetup);
			res.status(200).send({
				status: 200,
				data: meetup
			});
		}

	}
	updateAMeetup (req, res) {
		const meetups = MeetupModel._meetups;
		const meetup = meetups.find(ele => ele.id === parseInt(req.params.id));
		if (!meetup) {
			res.status(404).send({
				status: 404, 
				error: 'No meetup selected'});
			return;

		}
		const validateMeetup = Validate._validateMeetup;
		const {error} = validateMeetup(req.body);
		if(error) {
			res.status(400).send({
				status: 400,
				error: error.details[0].message});
		}
		meetup.id = req.body.id,
		meetup.happeningOn = req.body.happeningOn,
		meetup.location = req.body.location,
		meetup.topic = req.body.topic,
		meetup.tags = req.body.tags,
		res.status(200).send({
			status: 200,
			data: meetup
		});
	}

	deleteAMeetup (req, res) {
		const meetups = MeetupModel._meetups;
		const meetup = meetups.find(ele => ele.id === parseInt(req.params.id));
		if (!meetup) {
			res.status(404).send({
				status: 404,
				error: 'Nothing to delete'});
			return;
		}
		const index = meetups.indexOf(meetup);
		meetups.splice(index, 1);
		res.send({
			status: 200,
			data: meetup});
	}
	postARsvp (req, res){
		const rsvps = MeetupModel._rsvp;
		const validateRsvp = Validate._validateRsvp;
		const {error} = validateRsvp(req.body);
		if(!error) {
			const {details} = error;
			const messages = [];
			details.forEach(detail => {
				messages.push(detail.message);
			});
			return res.status(400).send({
				status: 400,
				error: messages
			});
		} else  {
			const rsvp  = {
				id: rsvps.length + 1,
				meetup: req.params.id,
				topic: req.body.topic,
				status: req.body.status,
			};
			rsvps.push(rsvp);
			res.send({
				status: 200,
				data: rsvp});

		}

	}
}
module.exports = new MeetupController();