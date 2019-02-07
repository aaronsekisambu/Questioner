import {expect} from 'chai';

import chai from 'chai';

import assertArrays from 'chai-arrays';

import app from '../../app';

import chai_http from 'chai-http';

chai.use(chai_http);
chai.use(assertArrays);
const questionSpecTest = () => {
	describe('Test the questioner root', () => {
		it('Should GET all questions at api/v1/questions', (done) => {
			chai.request(app)
				.get('/api/v1/questions')
				.end((err, res)=> {
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
					expect(res.body.status).to.eql(404);
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
	});
};


export default questionSpecTest();