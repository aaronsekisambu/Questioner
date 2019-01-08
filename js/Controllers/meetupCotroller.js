const MeetupModel = require('../models/meetupModels');
const Validate = require('../utils/utils');


class MeetupController {
    getAllMeetups (req, res) {
        const meetups = MeetupModel._meetups;
        const result = [];
        meetups.forEach(meetup => {
            const {topic,location, happeningOn, tags} = meetup;
            result.push({
                topic,
                location,
                happeningOn,
                tags,
            })
        })
        res.status(200);
            res.send({
                status: 200,
                 data: result
                });
        }
    getAllUpcomingMeetups (req, res) {
        const meetups = MeetupModel._meetups;
        // const meetup = meetups.find(ele => ele.upcoming === parseInt(req.params.upcoming));
        if (!meetups) res.status(404).send({
            status: 404, 
            Error: 'Currently No meetup'});
        res.send({
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
            error: 'Username or password is incorect'});
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
            res.status(400).send({
                status: 400, Error: error.details[0].message});
            return;
        };
        const meetup = {
            id: meetups.length + 1,
            location: req.body.location,
            topic: req.body.topic,
            happeningOn: req.body.happeningOn,
            tags: req.body.tags,
        }
        meetups.push(meetup);
        res.send({
            status: 200, 
            data: meetup
        });
    }
    updateAMeetup (req, res) {
        const meetups = MeetupModel._meetups;
        const meetup = meetups.find(ele => ele.id === parseInt(req.params.id));
        if (!meetup) {
            res.status(404).send({ 
                status: 404, error: 'No meetup selected'});
            return;
        };
        const validateMeetup = Validate._validateMeetup;
        const {error} = validateMeetup(req.body);
        if(error) {
            res.status(400).send({
                status: 400, Error: error.details[0].message});
            return;
        };
        meetup.id = req.body.id,
        meetup.happeningOn = req.body.happeningOn,
        meetup.location = req.body.location,
        meetup.topic = req.body.topic,
        meetup.tags = req.body.tags, 
        res.send({
            status: 200, 
            data: meetup});
    }
    deleteAMeetup (req, res) {
        const meetups = MeetupModel._meetups;
        const meetup = meetups.find(ele => ele.id === parseInt(req.params.id));
        if (!meetup) {
            res.status(404).send({
                status: 404, Error: 'Nothing to delete'});
            return;
        };
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
        if(error) {
            res.status(400).send({
                status: 400, Error: error.details[0].message});
            return;
        };
        const rsvp  = {
            meetup: req.body.meetup,
            topic: req.body.topic,
            status: req.body.status,
        }
        rsvps.push(rsvp);
        res.send({
            status: 200, 
            data: rsvp});
    };
}
module.exports = new MeetupController();