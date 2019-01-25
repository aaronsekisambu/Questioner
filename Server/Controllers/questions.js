const moment = require('moment');
const uuidv4 = require('uuidv4');
const Validate = require('../helpers/utils');

const db = require('../db');

class QuestionController {
	// Get all questions
	async getAllQuestions(req, res) {
		const createQuery = 'select * from questions';
		try {
			const { rows } = await db.query(createQuery);
	
			return res.status(200).send(rows);
		} catch(error) {
			return res.status(400).send(error.message);
		}
	}
	async getAllComments(req, res) {
		const createQuery = 'select * from comments';
		try {
			const { rows } = await db.query(createQuery);
	
			return res.status(200).send(rows);
		} catch(error) {
			return res.status(400).send({
				status: 400,
				data: {
					error: error.message
				}
			});
		}
		
	}
	// Create a comment
	async postAComment (req, res) {
		const comments = req.body;

	
		try {
			const insert = 'insert into comments(c_id, body, user_id, questions_id) ' +
					'values($1, $2, $3, $4)';
			const insertValues = [
				uuidv4(),
				comments.body,
				comments.userId,
				comments.questions_id
			];
			await db.query(insert, insertValues);
			const validation = Validate._validateUser;
			const {error} = validation(req.body);
			if(error){
				const {details} = error;
				const messages = [];
				details.forEach(detail => {
					messages.push(detail.message);
				});
				return res.status(400).send({
					status: 400,
					error: messages
				});
			}
			return res.status(200).json({ 
				status: 200,
				data: {message: 'Your question has been saved'
				}
			
			});
		} catch (err) {
			res.status(400).send({
				status: 400,
				error: err.message
			});
		}
	}

	// Get a specific question
	async getAQuestion(req, res) {
		const { id } = req.params;

		const createQuery = `select * from meetups where m_id='${id}'`;
		try {
			const { rows } = await db.query(createQuery);
	
			return res.status(200).send(rows);
		} catch(error) {
			return res.status(400).json({ error: error.message });
		}
	}
	// Get votes on a question
	async getVotesOnAQuestion (req, res) {
		const votes = QuestionModel._votes;
		res.status(200).send({
			status: 200,
			data: votes
		}); 
	}
	//upvote on a question
	async upVote (req, res) {
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
	async downVote (req, res) {
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
	async postAQuestion (req, res) {
		// const { id: meetupId } = req.params;
		const question = req.body;

	
		try {
			const insert = 'insert into questions(q_id, meetup, title, body, createdby, createdon, upvote, downvote) ' +
					'values($1, $2, $3, $4, $5, $6, $7, $8)';
			const insertValues = [
				uuidv4(),
				question.title,
				question.meetup,
				question.body,
				question.createdby,
				moment(new Date()),
				0,
				0
			];
			await db.query(insert, insertValues);
			const validation = Validate._validateUser;
			const {error} = validation(req.body);
			if(error){
				const {details} = error;
				const messages = [];
				details.forEach(detail => {
					messages.push(detail.message);
				});
				return res.status(400).send({
					status: 400,
					error: messages
				});
			}
			return res.status(200).json({ 
				status: 200,
				data: {message: 'Your question has been saved'
				}
			
			});
		} catch (err) {
			res.status(400).send({
				status: 400,
				error: err.message
			});
		}
	}
	// update a specific questions
	async updateAQuestion(req, res) {
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
			const validation = Validate._validateUser;
			const {error} = validation(req.body);
			if(error){
				const {details} = error;
				const messages = [];
				details.forEach(detail => {
					messages.push(detail.message);
				});
				return res.status(400).send({
					status: 400,
					error: messages
				});
			}
			return res.status(200).send(rows[0]);
		} catch(error) {
			return res.status(400).send(error.message);
		}
	}
	// delete a specific question
	async deleteAQuestion(req, res) {
		const { id } = req.params;
		const createQuery = `delete from questions where q_id='${id}' returning *`;

		try {
			const { rows } = await db.query(createQuery);

			return res.status(200).send(rows);
		} catch(error) {
			return res.status(400).json({ error: error.message });
		}
	}
}
module.exports = new QuestionController();