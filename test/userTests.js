const request = require('request');
const assert = require('assert');
const app = require('../js/app');
const expect = require('chai').expect;
const chai = require('chai');
const supertest = require('supertest');
const chaiHttp = require('chai-http');
chai.use(require('chai-http'));
const assertArrays = require('chai-arrays');
chai.use(assertArrays);


const UserTests = () => {
    // Testing the root get function for questions
    describe('Test the user root', () => {
        it('GET all users at api/v1/users', (done) => {
            chai.request(app)
            .get('/api/v1/users')
            .end((err, res)=> {
              expect(res).to.have.status(200);
              expect(res.body).to.be.an('object');
            done();
            });
        });
        it('GET a specific user', (done) => {
            chai.request(app)
            .get('/api/v1/users/1')
            .end((err, res)=> {
              expect(res).to.have.status(200);
              expect(res.body.data).to.have.property('firstname');
              expect(res.body.data).to.have.property('email');
            done();
            });
        });
        it('return 404 on a specific user', (done) => {
            chai.request(app)
            .get('/api/v1/users/6')
            .end((err, res)=> {
              expect(res).to.have.status(404);
              expect(res.body.error).to.eql('Username or password is incorect');
            done();
            });
        });
        it('POST a specific user', (done) => {
            chai.request(app)
            .post('/api/v1/users/1')
            .end((err, res)=> {
              expect(res.body.status).to.eql(200);
            done();
            });
        });
        it('return a 404 for unvailable user', (done) => {
            chai.request(app)
            .put('/api/v1/users/5')
            .end((err, res)=> {
              expect(res.body.status).to.eql(404);
              expect(res.body.error).to.eql('invalid user')
            done();
            });
        });
        it('delete a specific user', (done) => {
            chai.request(app)
            .delete('/api/v1/user/1')
            .end((err, res)=> {
              expect(res.body.status).to.eql(200);
            done();
            });
        });
        it('return a 404 on unavailable user deleted', (done) => {
            chai.request(app)
            .delete('/api/v1/users/5')
            .end((err, res)=> {
              expect(res.body.status).to.eql(404);
            done();
            });
        });
    });
}


module.exports = UserTests();