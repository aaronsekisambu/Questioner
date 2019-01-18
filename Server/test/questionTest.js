const app = require('../../app');
const expect = require('chai').expect;
const chai = require('chai');
chai.use(require('chai-http'));
const assertArrays = require('chai-arrays');
chai.use(assertArrays);
const questionModel = require('../models/questionModels');


const questionSpecTest = () => {
	describe('Test the questioner root', () => {
		it('Should GET all questions at api/v1/questions', (done) => {
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
		it('Should return 404 on GET a specific question ID', (done) => {
			chai.request(app)
				.get('/api/v1/questions/5')
				.end((err, res)=> {
					expect(res.body.error).to.eql('No Question Selected');
					expect(res.body.status).to.eql(404);
					done();
				});
        
		});
		it('Should return a specific question with a specific id', (done) => {
			chai.request(app)
				.get('/api/v1/questions/1')
				.end((err, res)=> {
					expect(res.body.status).to.eql(200);
					expect(res.body.data).to.have.property('createdOn');
					expect(res.body.data).to.have.property('createdBy');
					done();
				});
		});
		it('Should return a 400 on a wrong input', (done) => {
			const question = {
				createdBy: '', // represents the user asking the question
				title: 'Express',
				body: 'Why so many libaries in Javascript',
				votes: 0
			};
			chai.request(app)
				.post('/api/v1/meetups/1/questions')
				.send(question)
				.end((err, res)=> {
					expect(res.status).to.eql(400);
					done();
				});
		});
		it('Should return a 404 on POST not found', (done) => {
			chai.request(app)
				.post('/api/v1/meetups/1/questions/1')
				.end((err, res)=> {
					expect(res.body.status).to.eql(404);
					expect(res.body.error).to.eql('Page not found. Please try again');
					done();
				});
		});
		it('Should POST a specific question in a meetup', (done) => {
			const questions = {
				createdBy: 1, // represents the user asking the question
				title: 'Express',
				body: 'Why so many libaries in Javascript'
			};
			chai.request(app)
				.post('/api/v1/meetups/1/questions')
				.send(questions)
				.end((err, res)=> {
					expect(res.body.status).to.eql(200);
					expect(res.body.data.createdBy).to.eql(1);
					expect(res.body.data.body).to.eql('Why so many libaries in Javascript');
					expect(res.body.data.title).to.eql('Express');
					done();
				});
		});
		it('Should PUT/ a specific question', (done) => {
			const questions = {
				createdBy: 1, // represents the user asking the question
				title: 'Express',
				body: 'Why so many libaries in Javascript'
			};
			chai.request(app)
				.put('/api/v1/questions/1')
				.send(questions)
				.end((err, res)=> {
					expect(res).to.have.status(200);
					done();
				});
		});
		it('Should PUT/ return 400 on a specific question', (done) => {
			const questions = {
				createdBy: '', // represents the user asking the question
				title: 'Express',
				body: 'Why so many libaries in Javascript',
				votes: 0
			};
			chai.request(app)
				.put('/api/v1/questions/1')
				.send(questions)
				.end((err, res)=> {
					expect(res.status).to.eql(400);
					expect(res.body.error).to.eql('No Question currently');
					done();
				});
		});
		it('Should Delete/ a Question', (done) => {
			const question = {
				id: 1,
				createdOn: new Date(),
				createdBy: 1, // represents the user asking the question
				meetup: 1,
				title: 'Express',
				body: 'Why so many libaries in Javascript',
				votes: 0
			};
			questionModel._questions.push(question)
			chai.request(app)
				.delete('/api/v1/questions/1')
				.end((err, res) => {
					expect(res.body.status).to.eql(200);
					expect(res.body.data).to.have.property('id');
					expect(res.body.data).to.have.property('meetup');
					done();
				});
		});
		it('Should return 404 on a deleted question', (done) => {
			chai.request(app)
				.delete('/api/v1/questions/5')
				.end((err, res) => {
					expect(res.body.status).to.eql(404);
					expect(res.body.error).to.eql('Nothing to delete');
					done();
				});
		});
		describe('Voting', () => {
			it('Should GET all votes on a specific question', (done) => {
				chai.request(app)
					.get('/api/v1/questions/1/votes')
					.end((err, res)=> {
						expect(res.body.status).to.eql(200);
						done();
					});
			});
			it('Should PATCH/ Upvote a specific question', (done) => {
				chai.request(app)
					.patch('/api/v1/questions/1/upvotes')
					.end((err, res)=> {
						expect(res.body.status).to.eql(400);
						done();
					});
			});
			it('Should return a 400 on Upvoting a specific question', (done) => {
				chai.request(app)
					.patch('/api/v1/questions/1/upvotes')
					.end((err, res)=> {
						expect(res.body.status).to.eql(400);
						done();
					});
			});
			it('Should return a 400 on downvoting a specific question', (done) => {
				chai.request(app)
					.patch('/api/v1/questions/1/downvotes')
					.end((err, res)=> {
						expect(res.body.status).to.eql(400);
						done();
					});
			});
		});
	});
};


module.exports = questionSpecTest();