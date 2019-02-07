import app from '../../app';

import {expect} from 'chai';

import chai from 'chai';

import chai_http from 'chai-http';

import questionSpecTest from './questions';

import MeetupSpecTest from './meetups';

import UserTests from './users';

chai.use(chai_http);
//Running test cases for global app.js file and connecting it to other test files, models and controllers
describe('Testing the Qustioner API', () => {
	describe('Testing the home directory ', () => {
		it('Find "/questioner.com" ', (done) => {
			chai.request(app)
				.get('/')
				.end((err, res) => {
					expect(res).to.have.status(200);
					expect(res.body.message).to.eql('This is the root directory, You have not made any request');
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
					expect(res.body.error).to.eql('Page not found. Please try again');
					done();
				});
		});
	});

	questionSpecTest;
	MeetupSpecTest;
	UserTests;
});