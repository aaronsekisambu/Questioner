const users = [{
    id: 1,
    firstname: 'Aaron',
    lastname: 'Sekisambu' ,
    othername: '' ,
    email: 'aaron.sekisambu@gmail.com' ,
    phoneNumber: 256,
    username: 'aaron.sekisambu' ,
    registered: new Date(),
    isAdmin: true
},
{
    id: 2,
    firstname: 'Aaron',
    lastname: 'Sekisambu' ,
    othername: '' ,
    email: 'aaron.sekisambu@gmail.com' ,
    phoneNumber: 256,
    username: 'aaron.sekisambu' ,
    registered: new Date(),
    isAdmin: true
},
{
    id: 3,
    firstname: 'Aaron',
    lastname: 'Sekisambu' ,
    othername: '' ,
    email: 'aaron.sekisambu@gmail.com' ,
    phoneNumber: 256,
    username: 'aaron.sekisambu' ,
    registered: new Date(),
    isAdmin: true
}
];

// Meet up Data array
const meetups = [{
    id: 1,
    createdOn: new Date() ,
    location : 'Kampala' ,
    images: '[String, String]' , // OPTIONAL: URL to the image location
    topic: 'Express',
    happeningOn: new Date() , // when the meetup is holding
    Tags: '[String, String]'
},
{
    id: 2,
    createdOn: new Date() ,
    location : 'Kampala' ,
    images: '[String, String]' , // OPTIONAL: URL to the image location
    topic: 'Express',
    happeningOn: new Date() , // when the meetup is holding
    Tags: '[String, String]'
}];
//Questions Data array
const questions = [{
    id: 1,
    createdOn: new Date() ,
    createdBy: 1 , // represents the user asking the question
    meetup: 1, // represents the meetup the question is for
    title : 'Express',
    body: 'Why so many libaries in Javascript',
    votes: 1
}];
// Votes Data array
const votes = [{
    status: 1,
    data: [ {
        meetup: 1, // meetup record primary key
        title: 'Express', // title of the question
        body: 'Why so many libaries in Javascript', // body of the question
        votes: -1
    }]
}];
// RSVP Data array
const rsvps = [{
    id: 1,
    meetup: 1,
    user: 1, // represents the user
    response: 'yes', // [yes, no, or maybe]
}];
module.exports = {users, meetups, questions, votes, rsvps }