const app = require('../../app');
const expect = require('chai').expect;
const chai = require('chai');
chai.use(require('chai-http'));
const assertArrays = require('chai-arrays');
chai.use(assertArrays);


const UserTests = () => {
	describe('Test the user root', () => {
		it('Should GET all users at api/v1/users', (done) => {
			chai.request(app)
				.get('/api/v1/users')
				.end((err, res)=> {
					expect(res).to.have.status(200);
					expect(res.body.data[0].firstname).to.be.eql('Aaron');
					expect(res.body.data[0].lastname).to.be.eql('Sekisambu');
					expect(res.body.data[0].email).to.be.eql('aaron.sekisambu@gmail.com');
					expect(res.body.data[0].phoneNumber).to.be.eql(256);
					expect(res.body.data[0].registered).to.be.eql('2019-01-01');
					expect(res.body.data[0].isAdmin).to.be.eql(true);
					done();
				});
		});
		it('Should GET a specific user', (done) => {
			chai.request(app)
				.get('/api/v1/users/1')
				.end((err, res)=> {
					expect(res).to.have.status(200);
					expect(res.body.data.firstname).to.eql('Aaron');
					expect(res.body.data.lastname).to.be.eql('Sekisambu');
					expect(res.body.data.email).to.be.eql('aaron.sekisambu@gmail.com');
					expect(res.body.data.phoneNumber).to.be.eql(256);
					expect(res.body.data.registered).to.be.eql('2019-01-01');
					expect(res.body.data.isAdmin).to.be.eql(true);
					done();
				});
		});
		it('Should return 404 on a specific user', (done) => {
			chai.request(app)
				.get('/api/v1/users/6')
				.end((err, res)=> {
					expect(res).to.have.status(404);
					expect(res.body.error).to.eql('Username or password is incorrect');
					done();
				});
		});
		it('Should POST a specific user', (done) => {
			const Users= {
				id: 1,
				firstname: 'Aaron',
				lastname: 'Sekisambu' ,
				othername: '' ,
				email: 'aaron.sekisambu@gmail.com' ,
				phoneNumber: 256,
				username: 'aaron.sekisambu' ,
				registered: '2019-01-01',
				isAdmin: true
			};
			chai.request(app)
				.post('/api/v1/users')
				.send(Users)
				.end((err, res)=> {
					expect(res.body.status).to.eql(400);
					done();
				});
		});
		it('Should update a specific user', (done) => {
			chai.request(app)
				.put('/api/v1/users/1')
				.end((err, res)=> {
					expect(res.body.status).to.eql(400);
					done();
				});
		});
		it('Should return a 404 for unvailable user', (done) => {
			chai.request(app)
				.put('/api/v1/users/5')
				.end((err, res)=> {
					expect(res.body.status).to.eql(404);
					expect(res.body.error).to.eql('invalid user');
					done();
				});
		});
		it('Should delete a specific user', (done) => {
			chai.request(app)
				.delete('/api/v1/users/1')
				.end((err, res)=> {
					expect(res.body.status).to.eql(200);
					done();
				});
		});
		it('Should return a 404 on unavailable user deleted', (done) => {
			chai.request(app)
				.delete('/api/v1/users/5')
				.end((err, res)=> {
					expect(res.body.status).to.eql(404);
					expect(res.body.error).to.eql('Nothing to delete');
					done();
				});
		});
	});
};


module.exports = UserTests();