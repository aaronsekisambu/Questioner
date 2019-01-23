
class MeetupModel {
	constructor() {
		this._meetups = [{
			id: 1,
			topic : 'Javascript',
			location : 'Kigali' ,
			happeningOn : 'January 20, 2019',
			CreatedOn:	'January 5, 2019',
			tags : ['Js', 'Py']
		}],
		this._rsvp = [{
			status : 'Yes' // [yes, no or maybe]
		}];

	}

}

module.exports = new MeetupModel();

