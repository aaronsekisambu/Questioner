const express = require('express');
const routes = express.Router();
const usersController = require('../Controllers/users');
const auth = require('../middleware/authenticate/verify');

routes.route('/api/v1/users')
	.get(auth.verifyToken, usersController.getAll )
	.post(usersController.create);

routes.route('/api/v1/users/:id') 
	.get(auth.verifyToken, usersController.getOne);

routes.route('/api/v1/users/:id')
	.put(auth.verifyToken, usersController.update)
	.delete(usersController.delete);

routes.route('/api/v1/auth/login')
	.post(auth.verifyToken, usersController.login);

routes.route('/api/v1/auth/signup')
	.post(usersController.create);

module.exports = routes;