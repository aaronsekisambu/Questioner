const expect = require('chai').expect;
const chai = require('chai');
chai.use(require('chai-http'));
const assertArrays = require('chai-arrays');
chai.use(assertArrays);

const app = require('../../app');



const UserTests = () => {
	describe('Test the user root', () => {
		it('Should GET all users at api/v1/users', (done) => {
			chai.request(app)
				.get('/api/v1/users')
				.end((err, res)=> {
					expect(res).to.have.status(200);
					expect(res.body.data.user[0].firstname).to.eql('Aaron');
					console.log(res.body.data.user[0].firstname);
					expect(res.body.data.user[0]).to.have.property('firstname');
					expect(res.body.data.user[0].lastname).to.eql('Sekisambu');
					expect(res.body.data.user[0]).to.have.property('lastname');
					expect(res.body.data.user[0].email).to.eql('aaron.sekisambu@gmail.com');
					expect(res.body.data.user[0]).to.have.property('email');
					expect(res.body.data.user[0].phonenumber).to.eql(256);
					expect(res.body.data.user[0]).to.have.property('phonenumber');
					expect(res.body.data.user[0].username).to.eql('Snow');
					expect(res.body.data.user[0]).to.have.property('username');
					done();
				});
		});
		it('Should GET a specific user', (done) => {
			chai.request(app)
				.get('/api/v1/users/64f5b75e-f189-41bf-8f99-c84c14be8fd9')
				.end((err, res)=> {
					expect(res).to.have.status(200);
					expect(res.body.data.user[0].firstname).to.eql('Aaron');
					expect(res.body.data.user[0]).to.have.property('firstname');
					expect(res.body.data.user[0].lastname).to.eql('Sekisambu');
					expect(res.body.data.user[0]).to.have.property('lastname');
					expect(res.body.data.user[0].email).to.eql('aaron.sekisambu@gmail.com');
					expect(res.body.data.user[0]).to.have.property('email');
					expect(res.body.data.user[0].phonenumber).to.eql(256);
					expect(res.body.data.user[0]).to.have.property('phonenumber');
					expect(res.body.data.user[0].username).to.eql('Snow');
					expect(res.body.data.user[0]).to.have.property('username');
					done();
				});
		});
		it('Should return 404 on a user not found', (done) => {
			chai.request(app)
				.get('/api/v1/users/64f5b75e-f189-41bf-8f99-c84c14be8fd')
				.end((err, res)=> {
					expect(res).to.have.status(400);
					console.log(res.body.code);
					expect(res.body.code).to.eql('22P02');
					done();
				});
		});
		it('Should POST a specific user', (done) => {
			const Users= {
				u_id: '89ae9201-475f-41e7-9765-d17db4c1c390',
				firstname: 'Aaron',
				lastname: 'Sekisambu' ,
				email: 'aaron.sekisambu@gmail.com',
				password: '12345',
				isAdmin: true,
				username: 'Snow' ,
				phoneNumber: 256,
				othername: 'Snow' ,
				registered: '2019-01-23',
				modified: '2019-01-23'
			};
			chai.request(app)
				.post('/api/v1/users')
				.send(Users)
				.end((err, res)=> {
					expect(res.status).to.eql(400);
					done();
				});
		});
		it('Should update a specific user', (done) => {
			chai.request(app)
				.put('/api/v1/users/64f5b75e-f189-41bf-8f99-c84c14be8fd9')
				.end((err, res)=> {
					expect(res.body.status).to.eql(400);
					done();
				});
		});

		it('Should delete a specific user', (done) => {
			chai.request(app)
				.delete('/api/v1/users/64f5b75e-f189-41bf-8f99-c84c14be8fd9')
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
					done();
				});
		});
	});
};


module.exports = UserTests();