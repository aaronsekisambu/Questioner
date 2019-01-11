const request = require('request');
const assert = require('assert');
const app = require('../js/app');
const questionSpecTest = require('../test/questionTest');
const MeetupSpecTest = require('../test/meetupTests');
const UserTests = require('../test/userTests');
const expect = require('chai').expect;
const chai = require('chai');
const supertest = require('supertest');
const chaiHttp = require('chai-http');
chai.use(require('chai-http'));




//Running test cases for global app.js file and connecting it to other test files, models and controllers
describe('Testing the Qustioner API', () => {
    describe('Testing the home directory ', () => {
      it('Find "/questioner.com" ', (done) => {
        chai.request(app)
          .get('/')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.message).to.eql("This is the root directory, You have not made any request");
            done();
          });
      });
    });
    describe('Testing for routes that do not exit', () => {
      it('Find "*" Expected to return an error', (done) => {
        chai.request(app)
          .get('/*')
          .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.body.error).to.eql("Page not found. Please try again");
            done();
          });
      });
    });

    questionSpecTest;
    MeetupSpecTest;
    UserTests;
  });