const app = require('../../app');
const expect = require('chai').expect;
const chai = require('chai');
chai.use(require('chai-http'));
const assertArrays = require('chai-arrays');
chai.use(assertArrays);
const MeetupSpecTest = () => {
	describe('Test the meetup root', () => {
		it('Should GET all meetup api/v1/meetups', (done) => {
			chai.request(app)
				.get('/api/v1/meetups')
				.end((err, res)=> {
					expect(res).to.have.status(200);
					expect(res.body).to.be.an('object');
					expect(res.body.data[0].id).to.eql(1);
					expect(res.body.data[0].topic).to.eql('Javascript');
					expect(res.body.data[0].location).to.eql('Kigali');
					expect(res.body.data[0].happeningOn).to.eql('Now');
					expect(res.body.data[0].tags).to.eql(['Js', 'Py']);
					done();
				});
		});
		it('Should GET all upcoming meetups', (done) => {
			chai.request(app)
				.get('/api/v1/meetups/upcoming')
				.end((err, res)=> {
					expect(res).to.have.status(400);
					expect(res.body).to.be.an('object');
					expect(res.body.error).to.eql('Currently no upcoming meetup(s)');
					done();
				});
		});
		it('Should GET a specific meetup', (done) => {
			chai.request(app)
				.get('/api/v1/meetups/1')
				.end((err, res)=> {
					expect(res).to.have.status(200);
					expect(res.body.data).to.have.property('location');
					expect(res.body.data).to.have.property('happeningOn');
					expect(res.body.data).to.have.property('id');
					done();
				});
		});
		it('Should return a 404 on a specific meetup', (done) => {
			chai.request(app)
				.get('/api/v1/meetups/6')
				.end((err, res)=> {
					expect(res).to.have.status(404);
					expect(res.body.error).to.eql('Invalid Meetup or Meetup not created');
					done();
				});
		});
		it('Should POST a specific meetup', (done) => {
			const meetup = {
				id: 1,
				topic : 'Javascript',
				location : 'Kigali' ,
				happeningOn : 'Now',
				tags : ['Js', 'Py']
			};
			chai.request(app)
				.post('/api/v1/meetups')
				.send(meetup)
				.end((err, res)=> {
					expect(res.body.status).to.eql(400);
					expect(res.body.error[0].message).to.eql('"id" is not allowed');
					expect(res.body.error[1].message).to.eql('"happeningOn" is not allowed');

					done();
				});
		});
		it('Should return a 400 on wrong post meetup', (done) => {
			const meetup = {
				topic : 'Javascript',
				location : 'Kigali' ,
				happeningOn : 'Now',
				tags : ['Js', 'Py']
			};

			chai.request(app)
				.post('/api/v1/meetups/5')
				.send(meetup)
				.end((err, res)=> {
					expect(res.body.status).to.eql(404);
					expect(res.body.error).to.eql('Page not found. Please try again');
					done();
				});
		});
		it('Should PUT a specific meetup', (done) => {
			const meetup = {
				id: 1,
				topic : 'Python',
				location : 'Kigali' ,
				happeningOn : 'Now',
				tags : ['Js', 'Py']
			};
			chai.request(app)
				.put('/api/v1/meetups/1')
				.send(meetup)
				.end((err, res)=> {
					expect(res.body.status).to.eql(400);
					done();
				});
		});
		it('Should return a 404 for unvailable meetup', (done) => {
			chai.request(app)
				.put('/api/v1/meetups/5')
				.end((err, res)=> {
					expect(res.body.status).to.eql(404);
					expect(res.body.error).to.eql('No meetup selected');
					done();
				});
		});
		it('Should delete a specific meetup', (done) => {
			chai.request(app)
				.delete('/api/v1/meetups/1')
				.end((err, res)=> {
					expect(res.body.status).to.eql(200);
					expect(res.body.data.topic).to.eql('Python');
					expect(res.body.data.location).to.eql('Kigali');
					expect(res.body.data.happeningOn).to.eql('Now');
					done();
				});
		});
		it('Should return a 404 on unavailable meetup delete', (done) => {
			chai.request(app)
				.delete('/api/v1/meetups/5')
				.end((err, res)=> {
					expect(res.body.status).to.eql(404);
					done();
				});
		});
		it('Should return a 400 on a specific rsvp not found', (done) => {
			const rsvps = {
				id: 1,
				meetup : 1 , // meetup record primary key
				topic : 'Javascript' , // meetup topic
				status : 'Yes' // [yes, no or maybe]
			}
			chai.request(app)
				.post('/api/v1/meetups/1/rsvp')
				.send(rsvps)
				.end((err, res)=> {
					expect(res.body.status).to.eql(200);
					expect(res.body.data.meetup).to.eql(1);
					expect(res.body.data.topic).to.eql('Javascript');
					expect(res.body.data.status).to.eql('Yes');
					done();
				});
		});
	});
};


module.exports = MeetupSpecTest();