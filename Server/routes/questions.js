const express = require('express');
const routesQuestions = express.Router();
const questionsController = require('../controllers/questionsController');

/* Questions End Points
================================================================================= */
// shows all questions available
routesQuestions.route('/api/v1/questions')
	.get(questionsController.getAllQuestions);
routesQuestions.route('/api/v1/meetups/:id/questions')
	.post(questionsController.postAQuestion);
// Gets a specific question using the question ID
routesQuestions.route('/api/v1/questions/:id')
	.get(questionsController.getAQuestion)
	.put(questionsController.updateAQuestion)
	.delete(questionsController.deleteAQuestion );

routesQuestions.route('/api/v1/questions/:id/votes')
	.get(questionsController.getVotesOnAQuestion);
// PATCH the Questions with an upvote or downvote
routesQuestions.route('/api/v1/questions/:id/upvotes')
	.patch(questionsController.upVote);
routesQuestions.route('/api/v1/questions/:id/downvotes')
	.patch(questionsController.downVote);
/* End of Meet up End points 
-----------------------------------------------------------------------------*/

module.exports = routesQuestions;