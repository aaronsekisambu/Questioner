class UserModel {
	constructor() {
		this._users= [{
			id: 1,
			firstname: 'Aaron',
			lastname: 'Sekisambu' ,
			othername: '' ,
			email: 'aaron.sekisambu@gmail.com' ,
			phoneNumber: 256,
			username: 'aaron.sekisambu' ,
			registered: '2019-01-01',
			isAdmin: true
		}];
	}
}

module.exports = new UserModel();