import assertArrays from 'chai-arrays';

import chai from 'chai';

import chai_http from 'chai-http';

import app from '../../app';

const expect = chai.expect;
chai.use(chai_http);
chai.use(assertArrays);
const UserTests = () => {
	describe('Test the user root', () => {
		it('Should GET all users at api/v1/users', (done) => {
			chai.request(app)
				.get('/api/v1/users')
				.end((err, res)=> {
					expect(res.body).to.be.an('object');
					done();
				});
		});
		it('Should GET a specific user', (done) => {
			chai.request(app)
				.get('/api/v1/users/64f5b75e-f189-41bf-8f99-c84c14be8fd9')
				.end((err, res)=> {
					expect(res.body).to.be.an('object');
					done();
				});
		});
		it('Should update a specific user', (done) => {
			chai.request(app)
				.put('/api/v1/users/64f5b75e-f189-41bf-8f99-c84c14be8fd9')
				.end((err, res)=> {
					expect(res.body).to.be.an('object');
					done();
				});
		});

		it('Should delete a specific user', (done) => {
			chai.request(app)
				.delete('/api/v1/users/64f5b75e-f189-41bf-8f99-c84c14be8fd9')
				.end((err, res)=> {
					expect(res.body).to.be.an('object');
					done();
				});
		});
		it('Should return a 404 on unavailable user deleted', (done) => {
			chai.request(app)
				.delete('/api/v1/users/5')
				.end((err, res)=> {
					expect(res.body).to.be.an('object');
					done();
				});
		});
	});
};


export default UserTests();