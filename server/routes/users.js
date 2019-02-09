import express from 'express';

import auth from '../middleware/authenticate/verify';

import usersController from '../controllers/users';

const routes = express.Router();
routes.route('/api/v1/users')
  .get(auth.verifyToken, usersController.getAll )
  .post(usersController.create);

routes.route('/api/v1/users/:id') 
  .get(auth.verifyToken, usersController.getOne);

routes.route('/api/v1/users/:id')
  .put(auth.verifyToken, usersController.update)
  .delete(usersController.delete);

routes.route('/api/v1/auth/login')
  .post(usersController.login);

routes.route('/api/v1/auth/signup')
  .post(usersController.create);

export default routes;