


class MeetupModel {
    constructor() {
        this._meetups = [{
            id: 1,
            topic : 'Kigali ',
            location : 'Kigali' ,
            happeningOn : new Date() ,
            tags : ['Me', 'Now', ]
        },
        {
            id: 2,
            topic : 'String' ,
            location : 'String' ,
            happeningOn : new Date() ,
            tags : ['Now, Me', ]
        }],
        this._rsvp = [{
            meetup : 1 , // meetup record primary key
            topic : 'String' , // meetup topic
            status : 'String' // [yes, no or maybe]
        }]
      }
    
    }

module.exports = new MeetupModel();