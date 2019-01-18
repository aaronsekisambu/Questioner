const QuestionModel = require('../models/questionModels');
const Validate = require('../helpers/utils');


class QuestionController {
	getAllQuestions(req, res) {
		const questions = QuestionModel._questions;
		return res.send({
			status: 200, 
			data: questions});
	}
	getAQuestion(req, res) {
		const questions = QuestionModel._questions;
		const question = questions.find(ele => ele.id === parseInt(req.params.id));
		if (!question) {
			return res.send({ 
				status: 404, 
				error:'No Question Selected'});
		}
		return res.send({
			status: 200, 
			data: question});
	}
	getVotesOnAQuestion (req, res) {
		const votes = QuestionModel._votes;
		res.status(200).send({
			status: 200,
			data: votes
		}); 
	}
	upVote (req, res) { 
  
		const questionId = Number(req.params.id);
		const userId = Number(req.body.userId);
    
		try {
			const updatedupVote = QuestionModel._questions;
			QuestionModel.upVote(questionId, userId);
			res.status(200).send({
				status: 200,
				data: updatedupVote
			});
		} catch (err) {
			res.status(400).send({
				status: 400,
				error: err.message,
			});
		}
	}

	downVote(req, res)  {
    
		const questionId = Number(req.params.id);
		const userId = Number(req.body.userId);
      
		try {
			const updatedDownVote = QuestionModel._questions;
			QuestionModel.downVote(questionId, userId);
      
			res.status(200).send({
				status: 200,
				data: updatedDownVote
			});
		} catch (err) {
			res.status(400).send({
				status: 400,
				error: err.message,
			});
		}
	}
	postAQuestion (req, res) {
		const questions = QuestionModel._questions;
		const validateQuestion = Validate._validateQuestion;
		const {error} = validateQuestion(req.body);
		if(error) {
			const {details} = error;
			const messages = [];
			details.forEach(detail => {
				messages.push(detail.message);
			})
			return res.status(400).send({
				status: 400, 
				error: messages
			});
    
		}else {
			const question  = {
				id: questions.length + 1,
				createdOn: new Date(),
				createdBy: req.body.createdBy,
				meetup: req.params.id,
				title: req.body.title,
				body: req.body.body,
				votes: req.body.votes,
			};
			questions.push(question);
			res.send({
				status: 200, data: question});

		}

	}
	updateAQuestion(req, res) {
		const questions = QuestionModel._questions;
		const question = questions.find(ele => ele.id === parseInt(req.params.id));
		if (!question) {
			res.status(400).send({
				status: 400,
				error: 'No Question currently'});
			return;
		}
		const validateQuestion = Validate._validateQuestion;
		const {error} = validateQuestion(req.body);
		if(error) {
			const {details} = error;
			const messages = [];
			details.forEach(detail => {
				messages.push(detail.message);
			})
			return res.status(400).send({
				status: 400,
				error: messages
			});
		}
		question.id = req.body.id,
		question.createdOn = req.body.createdOn,
		question.createdBy = req.body.createdBy,
		question.meetup = req.body.meetup,
		question.title = req.body.title,
		question.body = req.body.body, 
		question.votes = req.body.votes;
		res.status(200).send({
			status: 200, 
			data: question
		});
	}
	deleteAQuestion (req, res) {
		const questions = QuestionModel._questions;
		const question = questions.find(ele => ele.id === parseInt(req.params.id));
		if (!question) {
			res.status(404).send({
				status:  404,
				error: 'Nothing to delete'});
			return;
		}
		const index = questions.indexOf(question);
		questions.splice(index, 1);
		res.status(200).send({
			status:  200, 
			data: question
		});
	}
}
module.exports = new QuestionController();