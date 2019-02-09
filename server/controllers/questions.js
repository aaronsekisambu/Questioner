import moment from 'moment';

import uuidv4 from 'uuidv4';

import Validate from '../helpers/utils';

import db from '../db';
import meetups from '../test/meetups';

class QuestionController {
  // Get all questions
  async getAllQuestions(req, res) {
    const createQuery = 'select * from questions';
    try {
      const { rows } = await db.query(createQuery);
	
      return res.status(200).json({
        status: 200,
        data: rows
      });
    } catch(error) {
      return res.status(400).json({
        status: 400,
        data: error.message
      });
    }
  }
  async getAllComments(req, res) {
    const createQuery = 'select * from comments';
    try {
      const { rows } = await db.query(createQuery);
	
      return res.status(200).send(rows);
    } catch(error) {
      return res.status(400).json({
        status: 400,
        data: {
          error: error.message
        }
      });
    }
		
  }
  // Create a comment
  async postAComment (req, res) {
    const newComment = {
      user: req.user.id,
      comment: req.body.comment,
      question: parseInt(req.params.id, 10),
    };
    db.query('SELECT * FROM question WHERE q_id=$1', [newComment.question])
      .then((result) => {
        if (result.rows.length === 0) {
          return res.status(404).json({
            status: 200,
            error: 'Question not found' });
        }
        db.query('INSERT INTO comments(user_id,questions_id,body) VALUES($1,$2,$3) returning *',
          [newComment.user, newComment.question, newComment.comment])
          .then(comment => res.json({
            status: 200,
            comment: comment.rows
          }))
          .catch((er) => {
            console.log(er);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Get a specific question based off a meetup
  async getAQuestion(req, res) {
    const { id } = req.params;

    const createQuery = `select * from questions where meetup='${id}'`;
    try {
      const { rows } = await db.query(createQuery);
	
      return res.status(200).json({
        status: 200,
        data: rows
      });
    } catch(error) {
      return res.status(400).json({
        status: 400,
        error: error.message });
    }
  }
  // Get votes on a question
  async getVotesOnAQuestion (req, res) {
    const votes = QuestionModel._votes;
    res.status(200).json({
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
        return res.status(200).json({
          status: 200,
          message: 'You have already upvoted this question'});
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
        return res.status(200).json({
          status: 200,
          message: 'You have already upvoted this question'});
      }
      const resp = await db.query(insert, insertValues);
      if (resp) {
        const update = `update questions set upvote=(upvote - 1) where q_id='${questionId}'`;
        await db.query(update);
      }
      return res.status(200).json({
        status: 200,
        message: 'Thank you for your vote'});
    } catch (err) {
      res.status(400).send({
        status: 400,
        error: err.message,
      });
    }
  }
  // post a question
  async postAQuestion (req, res) {
    const meetup  = req.params.id;
	let meetupId = await meetups.findAll({meetups: id}).exec();
	console.log((meetupId));
    const question = req.body;

    try {
      const validation = Validate._validateQuestion;
      const {error} = validation(req.body);
      if(error) {
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
      const insert = `insert into questions(q_id, meetup, title, body, createdby, createdon, upvote, downvote)
					values($1, $2, $3, $4, $5, $6, $7, $8) returning *`;
      const insertValues = [
        uuidv4(),
        meetup.meetup,
        question.title,
        question.body,
        question.createdby,
        moment(new Date()),
        0,
        0
      ];
	  console.log(insertValues);
      const {rows} = await db.query(insert, insertValues);
      return res.status(200).json({ 
        status: 200,
        message: 'Your question has been saved',
        data: rows
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
      return res.status(200).json({
        status: 200,
        data: rows[0]
      });
    } catch(error) {
      return res.status(400).json({
        status: 400,
        data: error.message
      });
    }
  }
  // delete a specific question
  async deleteAQuestion(req, res) {
    const { id } = req.params;
    const createQuery = `delete from questions where q_id='${id}' returning *`;

    try {
      const { rows } = await db.query(createQuery);
      let messages = () => {
        if(rows.length === 0){
          return 'Question already deleted';
        }else
          return `Question with title '${rows[0].title}' deleted successfully`;
      };
      return res.status(200).json({
        status:200,
        message: `${messages()}`,
        data: rows
      });
    } catch(error) {
      return res.status(400).json({
        status: 400,
        error: error.message });
    }
  }
}

export default new QuestionController();