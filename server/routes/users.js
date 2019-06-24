import express from 'express';
import passport from 'passport';
import auth from '../middleware/authenticate/verify';
import usersController from '../controllers/users';

const router = express.Router();
router.post(
  '/api/v1/auth/google',
  passport.authenticate('google', { session: false }, null),
  usersController.googleOAuth
);
router
  .route('/api/v1/users')
  .get(auth.verifyToken, usersController.getAll)
  .post(usersController.create);

router.route('/api/v1/users/:id').get(auth.verifyToken, usersController.getOne);

router
  .route('/api/v1/users/:id')
  .put(auth.verifyToken, usersController.update)
  .delete(usersController.delete);

router.post('/api/v1/auth/login', usersController.login);

router.post('/api/v1/auth/signup', usersController.create);

export default router;
