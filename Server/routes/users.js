const express = require('express');
const routes = express.Router();
const UserController = require('../Controllers/user');

routes.route('/api/v1/users')
	.get(UserController.getAll )
	.post(UserController.create);

routes.route('/api/v1/users/:id') 
	.get(UserController.getOne);

routes.route('/api/v1/users/:id')
	.put(UserController.update)
	.delete(UserController.delete);

routes.route('/api/v1/users/login')
	.post(UserController.login);

module.exports = routes;