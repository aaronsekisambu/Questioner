import {expect} from 'chai';

import chai from 'chai';

import app from '../../app';

import assertArrays from 'chai-arrays';

import chai_http from 'chai-http';

chai.use(chai_http);
chai.use(assertArrays);
const MeetupSpecTest = () => {
	describe('Test the meetup root', () => {
		it('Should GET all meetup api/v1/meetups', (done) => {
			chai.request(app)
				.get('/api/v1/meetups')
				.end((err, res)=> {
					expect(res.body).to.be.an('object');
					done();
				});
		});
		it('Should GET all upcoming meetups', (done) => {
			chai.request(app)
				.get('/api/v1/meetups/upcoming')
				.end((err, res)=> {
					expect(res.body).to.be.an('object');
					done();
				});
		});
		it('Should return a 404 on a specific meetup', (done) => {
			chai.request(app)
				.get('/api/v1/meetups/6')
				.end((err, res)=> {
					expect(res.body).to.be.an('object');
					done();
				});
		});
		it('Should return a 404 for unvailable meetup', (done) => {
			chai.request(app)
				.put('/api/v1/meetups/5')
				.end((err, res)=> {
					expect(res.body).to.be.an('object');
					done();
				});
		});
		it('Should return a 404 on unavailable meetup delete', (done) => {
			chai.request(app)
				.delete('/api/v1/meetups/5')
				.end((err, res)=> {
					expect(res.body).to.be.an('object');
					done();
				});
		});
	});
};


export default MeetupSpecTest();