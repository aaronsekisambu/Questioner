import express from 'express';

import auth from '../middleware/authenticate/verify';

import questionsController from '../Controllers/questions';

const routesQuestions = express.Router();
routesQuestions.route('/api/v1/questions')
	.get(auth.verifyToken, questionsController.getAllQuestions);
routesQuestions.route('/api/v1/meetups/:id/questions')
	.post(auth.verifyToken, questionsController.postAQuestion)
	.get(auth.verifyToken, questionsController.getAQuestion);

routesQuestions.route('/api/v1/questions/:id')
	.put(auth.verifyToken, questionsController.updateAQuestion)
	.delete(auth.verifyToken, questionsController.deleteAQuestion);

routesQuestions.route('/api/v1/questions/:id/votes')
	.get(auth.verifyToken, questionsController.getVotesOnAQuestion);

routesQuestions.route('/api/v1/questions/:id/upvotes')
	.patch(auth.verifyToken, questionsController.upVote);
routesQuestions.route('/api/v1/questions/:id/downvotes')
	.patch(auth.verifyToken, questionsController.downVote);

routesQuestions.route('/api/v1/questions/:id/comments')
	.get(auth.verifyToken,  questionsController.getAllComments);
	
routesQuestions.route('/api/v1/questions/:id/comments')
	.post(auth.verifyToken,  questionsController.postAComment);


export default routesQuestions;