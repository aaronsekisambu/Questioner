const express = require('express');
const routesQuestions = express.Router();
const QuestionController = require('../Controllers/questionController');

/* Questions End Points
================================================================================= */
// shows all questions available
routesQuestions.route('/api/v1/questions')
	.get(QuestionController.getAllQuestions);
routesQuestions.route('/api/v1/meetups/:id/questions')
	.post(QuestionController.postAQuestion);
// Gets a specific question using the question ID
routesQuestions.route('/api/v1/questions/:id')
	.get(QuestionController.getAQuestion)
	.put(QuestionController.updateAQuestion)
	.delete(QuestionController.deleteAQuestion );

routesQuestions.route('/api/v1/questions/:id/votes')
	.get(QuestionController.getVotesOnAQuestion);
// PATCH the Questions with an upvote or downvote
routesQuestions.route('/api/v1/questions/:id/upvotes')
	.patch(QuestionController.upVote);
routesQuestions.route('/api/v1/questions/:id/downvotes')
	.patch(QuestionController.downVote);
/* End of Meet up End points 
-----------------------------------------------------------------------------*/

module.exports = routesQuestions;