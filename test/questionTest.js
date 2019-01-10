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
        it('return 404 on GET a specific question ID', (done) => {
            chai.request(app)
            .get('/questioner.com/api/v1/questions/5')
            .end((err, res)=> {
            expect(res.body.error).to.eql('Username or password is incorect');
            expect(res.body.status).to.eql(404);
            done();
            });
        
        });
        it('GET a specific question ID', (done) => {
            chai.request(app)
            .get('/questioner.com/api/v1/questions/1')
            .end((err, res)=> {
                expect(res.body.status).to.eql(200);
            expect(res.body.data).to.have.property('createdOn');
            expect(res.body.data).to.have.property('createdBy');
            done();
            });
        });
        it('PUT/ to a specific question', (done) => {
            chai.request(app)
            .put('/questioner.com/api/v1/questions/1')
            .end((err, res)=> {
              expect(res).to.have.status(404);
              expect(res.body.error).to.eql('No Question currently');
            done();
            });
        });
        it('Delete/ a Question', (done) => {
            chai.request(app)
            .delete('/questioner.com/api/v1/questions/1')
            .end((err, res) => {
                expect(res.body.error).to.eql('Nothing to delete')
                expect(res.body).to.be.an('object')
            done();
            })
        })
        // it('Delete/ a Questio jhgn', (done) => {
        //     chai.request(app)
        //     .delete('/questioner.com/api/v1/questions/1')
        //     .end((err, res) => {
        //         expect(res.body.error).to.eql('Nothing to delete')
        //         expect(res.body).to.be.an('object')
        //     done();
        //     })
        // })
    });
}


module.exports = questionSpecTest();