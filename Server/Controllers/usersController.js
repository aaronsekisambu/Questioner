const UserModel = require('../queries/userQueries');
const Validate = require('../helpers/utils');
// const moment = require('moment');
// const uuid = require('uuid');

class UserController {
	getAllUsers (req, res) {
		const users = UserModel._users;
		res.send({
			status: 200,
			data: users});
	}
	getASpecificUser (req, res) {
		const users = UserModel._users;
		const user = users.find(ele => ele.id === parseInt(req.params.id));
		if (!user) res.status(404).send({
			status: 404, 
			error: 'Username or password is incorrect'});
		res.send({
			status: 200, 
			data: user});
	}
	postAUser (req, res) {
		const user = UserModel.create(req.body);
		const validateUser = Validate._validateUser;
		const {error} = validateUser(req.body);
		if(error) {
			return res.status(400).send({
				status: 400,
				error: error.details
			});
		}
		return res.send({
			status: 201, 
			data: user});
	}
	updateAUser (req, res) {
		const users = UserModel._users;
		const user = users.find(ele => ele.id === parseInt(req.params.id));
		if (!user) {
			res.status(404).send({ 
				status: 404, 
				error: 'invalid user'});
			return;
		}
		const validateUser = Validate._validateUser;
		const {error} = validateUser(req.body);
		if(error) {
			res.status(400).send({
				status: 400, Error: error.details[0].message});
			return;
		}
		user.id = req.body.id,
		user.firstname = req.body.firstname,
		user.lastname = req.body.lastname,
		user.othername = req.body.othername,
		user.email = req.body.email,
		user.phoneNumber = req.body.phoneNumber,
		user.username = req.body.username,
		user.registered = req.body.registered,
		user.isAdmin = req.body.isAdmin;
		res.send(user);
	}
	deleteAUser(req, res) {
		const users = UserModel._users;
		const user = users.find(ele => ele.id === parseInt(req.params.id));
		if (!user) {
			res.status(404).send({
				status: 404, 
				error: 'Nothing to delete'});
			return;
		}

		const index = users.indexOf(user);
		users.splice(index, 1);
		res.send({
			status: 200, data: user});
	}
}

module.exports = new UserController;