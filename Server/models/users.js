const moment = require('moment');
const uuid = require('uuid');
class UserModel {
	constructor() {
		this.users = [];
	}
	create(data) {
		const newUser = {
			id: uuid.v4(),
			firstname: data.firstname || '',
			lastname: data.lastname || '',
			othername: data.othername || '',
			email: data.email || '',
			password: data.password || '',
			phonenumber: data.phonenumber || '',
			registered: moment.now(),
			modified_date: moment.now(),
			isadmin: data.isadmin

	
		};
		this.users.push(newUser);
		return newUser;
	}

	findOne(id) {
		return this.users.find(u => u.id === id);
	}

	findAll() {
		return this.users;
	}

	update(id, data) {
		const user = this.findOne(id);
		const index = this.users.indexOf(user);
		this.users[index].firstname = data['firstname'] || user.firstname;
		this.users[index].lastname = data['lastname'] || user.lastname;
		this.user[index].othername = data['othername'] || user.othername;
		this.users[index].email = data['email'] || user.email;
		this.users[index].password = data['password'] || user.password;
		this.user[index].phonenumber = data['phonenumber'] || user.phonenumber;
		this.users[index].registered = moment.now();
		return this.users[index];
	}

	delete(id) {
		const user = this.findOne(id);
		const index = this.reflections.indexOf(user);
		this.users.splice(index, 1);
		return {status: 201, message: 'User Deleted Succefully'};
	}
}

module.exports = new UserModel();