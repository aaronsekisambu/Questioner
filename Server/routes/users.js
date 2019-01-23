const express = require('express');
const routes = express.Router();
const usersController = require('../controllers/users');

routes.route('/api/v1/users')
	.get(usersController.getAll )
	.post(usersController.create);

routes.route('/api/v1/users/:id') 
	.get(usersController.getOne);

routes.route('/api/v1/users/:id')
	.put(usersController.update)
	.delete(usersController.delete);

routes.route('/api/v1/users/login')
	.post(usersController.login);

module.exports = routes;