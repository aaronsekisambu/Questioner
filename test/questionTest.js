const request = require('request');
const assert = require('assert');
const app = require('../js/app');
const expect = require('chai').expect;
const chai = require('chai');
const supertest = require('supertest');
const chaiHttp = require('chai-http');
chai.use(require('chai-http'));






const questionSpecTest = () => {
    // Testing the root get function for questions
    describe('Test the questioner root', () => {
        it('GET items at question.com/v1/questions', (done) => {
            chai.request(app)
            .get('/questioner.com/api/v1/questions')
            .end((err, res)=> {
              expect(res).to.have.status(200);
              expect(res.body).to.be.an('object');
            done();
            });
        });
    });
    // Testing a specific user to be got from the data base
    describe('A Question details', () => {
        it('GET a specific question ID', (done) => {
            chai.request(app)
            .get('/questioner.com/api/v1/questions/:id')
            .end((err, res)=> {
            expect(res.body.error).to.eql('Username or password is incorect');
            expect(res).to.have.status(200);
            done();
            });
        });
        it('It to a specific user ID', (done) => {
            chai.request(app)
            .put('/questioner.com/api/v1/questions/:id')
            .end((err, res)=> {
              expect(res).to.have.status(404);
            //   expect(res.body).to.have.property('id');
            //   expect(res.body.message).to.eql('No Question currently');
            //   expect(res).to.be.json;
            //   expect(res.body).to.be.an('object');
            //   expect(res.body.results).to.be.an('array');
            done();
            });
        });
    });
}


module.exports = questionSpecTest();