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


const questionSpecTest = () => {
    describe('Test the questioner root', () => {
        it('GET all questions at api/v1/questions', (done) => {
            chai.request(app)
            .get('/api/v1/questions')
            .end((err, res)=> {
              expect(res).to.have.status(200);
              expect(res.body).to.be.an('object');
            done();
            });
        });
    });
    describe('A Question details', () => {
        it('return 404 on GET a specific question ID', (done) => {
            chai.request(app)
            .get('/api/v1/questions/5')
            .end((err, res)=> {
            expect(res.body.error).to.eql('No Question Selected');
            expect(res.body.status).to.eql(404);
            done();
            });
        
        });
        it('return a specific question ID', (done) => {
            chai.request(app)
            .get('/api/v1/questions/1')
            .end((err, res)=> {
                expect(res.body.status).to.eql(200);
            expect(res.body.data).to.have.property('createdOn');
            expect(res.body.data).to.have.property('createdBy');
            done();
            });
        });
        it('return a 404 on POST not found', (done) => {
            chai.request(app)
            .post('/api/v1/questions/1')
            .end((err, res)=> {
              expect(res.body.status).to.eql(404);
              expect(res.body.error).to.eql('Page not found. Please try again')
            done();
            });
        });
        it('POST a specific question', (done) => {
            chai.request(app)
            .post('/api/v1/questions')
            .end((err, res)=> {
              expect(res.body.status).to.eql(400);
            done();
            });
        });
        it('PUT/ return 400 a specific question', (done) => {
            chai.request(app)
            .put('/api/v1/questions/1')
            .end((err, res)=> {
              expect(res).to.have.status(400);
            done();
            });
        });
        it('PUT/ return 404 on a specific question', (done) => {
            chai.request(app)
            .put('/api/v1/questions/5')
            .end((err, res)=> {
              expect(res.body.status).to.eql(404);
              expect(res.body.error).to.eql('No Question currently');
            done();
            });
        });
        it('Delete/ a Question', (done) => {
            chai.request(app)
            .delete('/api/v1/questions/1')
            .end((err, res) => {
                expect(res.body.status).to.eql(200);
                expect(res.body.data).to.have.property('id')
                expect(res.body.data).to.have.property('meetup')
            done();
            })
        })
        it('return 404 on a deleted question', (done) => {
            chai.request(app)
            .delete('/api/v1/questions/5')
            .end((err, res) => {
                expect(res.body.status).to.eql(404)
                expect(res.body.error).to.eql('Nothing to delete')
            done();
            })
        })
        describe('Voting', () => {
            it('GET all votes on a specific question', (done) => {
                chai.request(app)
                .get('/api/v1/questions/1/votes')
                .end((err, res)=> {
                  expect(res.body.status).to.eql(200);
                done();
                });
            });
            it('PATCH/ Upvote a specific question', (done) => {
                chai.request(app)
                .patch('/api/v1/questions/1/upvotes/1')
                .end((err, res)=> {
                  expect(res.body.status).to.eql(400);
                done();
                });
            });
            it('return a 400 on Upvoting a specific question', (done) => {
                chai.request(app)
                .patch('/api/v1/questions/1/upvotes/5')
                .end((err, res)=> {
                  expect(res.body.status).to.eql(400);
                done();
                });
            });
            it('return a 400 on downvoting a specific question', (done) => {
                chai.request(app)
                .patch('/api/v1/questions/1/downvotes/5')
                .end((err, res)=> {
                  expect(res.body.status).to.eql(400);
                done();
                });
            });
        });
    });
}


module.exports = questionSpecTest();