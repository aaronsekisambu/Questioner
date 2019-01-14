const request = require('request');
const assert = require('assert');
const app = require('../../app');
const expect = require('chai').expect;
const chai = require('chai');
const supertest = require('supertest');
const chaiHttp = require('chai-http');
chai.use(require('chai-http'));
const assertArrays = require('chai-arrays');
chai.use(assertArrays);


const MeetupSpecTest = () => {
    describe('Test the meetup root', () => {
        it('GET all questions at api/v1/meetups', (done) => {
            chai.request(app)
            .get('/api/v1/meetups')
            .end((err, res)=> {
              expect(res).to.have.status(200);
              expect(res.body).to.be.an('object');
            done();
            });
        });
        it('GET all upcoming meetups', (done) => {
            chai.request(app)
            .get('/api/v1/meetups/upcoming')
            .end((err, res)=> {
              expect(res).to.have.status(200);
              expect(res.body).to.be.an('object');
            done();
            });
        });
        it('GET a specific meetup', (done) => {
            chai.request(app)
            .get('/api/v1/meetups/1')
            .end((err, res)=> {
              expect(res).to.have.status(200);
              expect(res.body.data).to.have.property('location');
              expect(res.body.data).to.have.property('happeningOn');
            done();
            });
        });
        it('return 404 on a specific meetup', (done) => {
            chai.request(app)
            .get('/api/v1/meetups/6')
            .end((err, res)=> {
              expect(res).to.have.status(404);
              expect(res.body.error).to.eql('Invalid Meetup or Meetup not created');
            done();
            });
        });
        it('POST a specific meetup', (done) => {
            chai.request(app)
            .post('/api/v1/meetups')
            .end((err, res)=> {
              expect(res.body.status).to.eql(400);
            done();
            });
        });
        it('return a 404 on a page not found', (done) => {
            chai.request(app)
            .post('/api/v1/meetups/1')
            .end((err, res)=> {
              expect(res.body.status).to.eql(404);
              expect(res.body.error).to.eql('Page not found. Please try again');
            done();
            });
        });
        // it('PUT/ Check body here', (done) => {
        //     let meetup = [{
        //         id: 1,
        //         topic : 'String' ,
        //         location : 'String' ,
        //         happeningOn : new Date() ,
        //         tags : ['Now, Me', ]
        //       }];
        //     chai.request(app)
        //     .put('/api/v1/meetups/1')
        //     .send(meetup)
        //     .end((err, res)=> {
        //         res.body.book.should.have.property('topic');
        //       expect(res.body.status).to.eql(400);
        //     done();
        //     });
        // });
        it('return a 404 for unvailable meetup', (done) => {
            chai.request(app)
            .put('/api/v1/meetups/5')
            .end((err, res)=> {
              expect(res.body.status).to.eql(404);
              expect(res.body.error).to.eql('No meetup selected')
            done();
            });
        });
        it('delete a specific meetup', (done) => {
            chai.request(app)
            .delete('/api/v1/meetups/1')
            .end((err, res)=> {
              expect(res.body.status).to.eql(200);
            done();
            });
        });
        it('return a 404 on unavailable meetup delete', (done) => {
            chai.request(app)
            .delete('/api/v1/meetups/5')
            .end((err, res)=> {
              expect(res.body.status).to.eql(404);
            done();
            });
        });
        it('return a 400 on a specific rsvp not found', (done) => {
            chai.request(app)
            .post('/api/v1/meetups/5/rsvp')
            .end((err, res)=> {
              expect(res.body.status).to.eql(400);
            done();
            });
        });
    });
}


module.exports = MeetupSpecTest();