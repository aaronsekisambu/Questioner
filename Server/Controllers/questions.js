const moment = require('moment');
const uuidv4 = require('uuidv4');
const QuestionModel = require('../models/questionsModels');

const db = require('../db');

class QuestionController {
	// Get all questions
	static async getAllQuestions(req, res) {
		const createQuery = 'select * from questions';
		try {
			const { rows } = await db.query(createQuery);
	
			return res.status(201).send(rows);
		} catch(error) {
			return res.status(400).send(error.message);
		}
	}
	// Get a specific question
	static async getAQuestion(req, res) {
		const { id } = req.params;
		const createQuery = `select * from questions where q_id='${id}'`;
	
		try {
			const { rows } = await db.query(createQuery);
	
			return res.status(201).send(rows);
		} catch(error) {
			return res.status(400).json({ error: error.message });
		}
	}
	// Get votes on a question
	static getVotesOnAQuestion (req, res) {
		const votes = QuestionModel._votes;
		res.status(200).send({
			status: 200,
			data: votes
		}); 
	}
	//upvote on a question
	static async upVote (req, res) {
		const { id: questionId } = req.params;
		const { id: userId } = req.body;
		try {
			const find = `select * from votes where users_id='${userId}'`;
			const insert = 'insert into votes(v_id, upvote, downvote, users_id, questions_id) values($1, 1, 0, $2, $3)';
			const insertValues = [uuidv4(), userId, questionId];

			const findValue = await db.query(find);
			if (findValue.rowCount > 0) {
				return res.status(200).json({ message: 'You have already upvoted this question'});
			}
			const resp = await db.query(insert, insertValues);
			if (resp) {
				const update = `update questions set upvote=(upvote + 1) where q_id='${questionId}'`;
				await db.query(update);
			}
			return res.status(200).json({ message: 'Thank you for your vote'});
		} catch (err) {
			res.status(400).send({
				status: 400,
				error: err.message,
			});
		}
	}
	// downvote on a question
	static async downVote (req, res) {
		const { id: questionId } = req.params;
		const { id: userId } = req.body;
		try {
			const find = `select * from votes where users_id='${userId}'`;
			const insert = 'insert into votes(v_id, upvote, downvote, users_id, questions_id) values($1, 0, 1, $2, $3)';
			const insertValues = [uuidv4(), userId, questionId];
			
			const findValue = await db.query(find);
			if (findValue.rowCount > 0) {
				return res.status(200).json({ message: 'You have already upvoted this question'});
			}
			const resp = await db.query(insert, insertValues);
			if (resp) {
				const update = `update questions set upvote=(upvote - 1) where q_id='${questionId}'`;
				await db.query(update);
			}
			return res.status(200).json({ message: 'Thank you for your vote'});
		} catch (err) {
			res.status(400).send({
				status: 400,
				error: err.message,
			});
		}
	}
	// post a question
	static async postAQuestion (req, res) {
		const { id: meetupId } = req.params;
		const question = req.body;
	
		try {
			const insert = 'insert into questions(q_id, meetup, title, body, createdby, createdon, upvote, downvote) ' +
					'values($1, $2, $3, $4, $5, $6, $7, $8)';
			const insertValues = [
				uuidv4(),
				meetupId,
				question.title,
				question.body,
				question.createdBy,
				moment(new Date()),
				0,
				0
			];
	
			await db.query(insert, insertValues);
			return res.status(200).json({ message: 'Your question ha s been saved'});
		} catch (err) {
			res.status(400).send({
				status: 400,
				error: err.message,
			});
		}
	}
	// update a specific questions
	static async updateAQuestion(req, res) {
		const createQuery = 'update questions set title=$1, body=$2 ' +
				'where (meetup=$3 and createdby=$4) returning *';
		const values = [
			req.body.title,
			req.body.body,
			req.body.meetup,
			req.body.createdby
		];
		try {
			const { rows } = await db.query(createQuery, values);
			return res.status(201).send(rows[0]);
		} catch(error) {
			return res.status(400).send(error.message);
		}
	}
	// delete a specific question
	static deleteAQuestion (req, res) {
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