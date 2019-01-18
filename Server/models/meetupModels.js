
class MeetupModel {
	constructor() {
		this._meetups = [{
			id: 1,
			topic : 'Javascript',
			location : 'Kigali' ,
			happeningOn : 'Now',
			tags : ['Js', 'Py']
		}],
		this._rsvp = [{
			id: 1,
			meetup : 1 , // meetup record primary key
			topic : 'Javascript' , // meetup topic
			status : 'Yes' // [yes, no or maybe]
		}];

	}

}

module.exports = new MeetupModel();

