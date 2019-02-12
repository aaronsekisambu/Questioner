import moment from 'moment';

import uuidv4 from 'uuidv4';
import jwt from 'jsonwebtoken';

import Validate from '../helpers/utils';

import db from '../db';


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
    const questionId = req.params.id;

    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.decode(token);
    const userId = payload.userId;

    try {
      const validation = Validate._validateComments;
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
      const insert = `insert into comments(c_id, user_id, questions_id, body)
					values($1, $2, $3, $4) returning *`;
      const insertValues = [
        uuidv4(),
        userId,
        questionId,
        req.body.body,
      ];

      const {rows} = await db.query(insert, insertValues);
      return res.status(200).json({
        status: 200,
        message: 'Thank you for commenting',
        data: rows
      });
    } catch (err) {
      res.status(400).send({
        status: 400,
        error: err.message
      });
    }
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

  // post a question
  async postAQuestion (req, res) {
    let meetupId  = req.params.id;
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
      const insert = `insert into questions(q_id, meetup, title, body, createdby, createdon, upvote, downvote, comments)
					values($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`;
      const insertValues = [
        uuidv4(),
        meetupId,
        question.title,
        question.body,
        question.createdby,
        moment(new Date()),
        0,
        0,
        question.comments
      ];
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

  //upvote on a question
  async upVote (req, res) {

    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.decode(token);
    const userId = payload.userId;

    const { id: questionId } = req.params;

    try {
      const find = `select * from votes where users_id='${userId}' and questions_id='${questionId}'`;

      const insertValues = [
        uuidv4(),
        userId,
        questionId
      ];

      const responseRows = `select title, body, questions.upvote, questions.downvote, users_id,  v_id, m_id from votes, questions, meetups where (questions.q_id=votes.questions_id AND
       meetups.m_id=questions.meetup AND questions.q_id='${questionId}')`;

      let didUserDownVote = false;

      const findValue = await db.query(find);
      if (findValue.rowCount > 0) {
        if (Number.parseInt(findValue.rows[0].upvote) === 0 && Number.parseInt(findValue.rows[0].downvote) === 1) {
          didUserDownVote = true;
        }
        if (!didUserDownVote) {
          const response = await db.query(responseRows);
          return res.status(200).json({
            status: 200,
            message: 'You have already upVoted this question',
            upvoted: response.rows
          });
        }
      }

      let update;
      let insert;
      let shouldUpdate = false;
      if (didUserDownVote) {
        update = `update questions set upvote=(upvote + 1), downvote=(downvote - 1) where q_id='${questionId}'`;
        insert = `update votes set upvote=1, downvote=0 where v_id='${findValue.rows[0].v_id}'`;
        shouldUpdate = true;
      } else {
        insert = `insert into votes(v_id, upvote, downvote, users_id, questions_id)
       values($1, 1, 0, $2, $3) returning *`;
        update = `update questions set upvote=(upvote + 1) where q_id='${questionId}'`;
      }

      const resp = await db.query(insert, shouldUpdate ? [] : insertValues);
      if (resp) {
        await db.query(update);
      }
      const response = await db.query(responseRows);
      return res.status(200).json({
        message: 'Thank you for your vote',
        upvoted: response.rows
      });
    } catch (err) {
      res.status(400).send({
        status: 400,
        error: err.message,
      });
    }
  }
  // downvote on a question
  async downVote (req, res) {

    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.decode(token);
    const userId = payload.userId;

    const { id: questionId } = req.params;

    try {
      const find = `select * from votes where users_id='${userId}' and questions_id='${questionId}'`;

      const insertValues = [
        uuidv4(),
        userId,
        questionId
      ];

      const responseRows = `select title, body, questions.upvote, questions.downvote, users_id,  v_id, m_id from votes, questions, meetups where (questions.q_id=votes.questions_id AND
       meetups.m_id=questions.meetup AND questions.q_id='${questionId}')`;

      let didUserUpVote = false;

      const findValue = await db.query(find);
      if (findValue.rowCount > 0) {
        if (Number.parseInt(findValue.rows[0].downvote) === 0 && Number.parseInt(findValue.rows[0].upvote) === 1) {
          didUserUpVote = true;
        }
        if (!didUserUpVote) {
          const response = await db.query(responseRows);
          return res.status(200).json({
            status: 200,
            message: 'You have already downVoted this question',
            upvoted: response.rows
          });
        }
      }

      let update;
      let insert;
      let shouldUpdate = false;
      if (didUserUpVote) {
        update = `update questions set downvote=(downvote + 1), upvote=(upvote - 1) where q_id='${questionId}'`;
        insert = `update votes set upvote=0, downvote=1 where v_id='${findValue.rows[0].v_id}'`;
        shouldUpdate = true;
      } else {
        insert = `insert into votes(v_id, upvote, downvote, users_id, questions_id)
       values($1, 1, 0, $2, $3) returning *`;
        update = `update questions set downvote=(downvote + 1) where q_id='${questionId}'`;
      }

      const resp = await db.query(insert, shouldUpdate ? [] : insertValues);
      if (resp) {
        await db.query(update);
      }
      const response = await db.query(responseRows);
      return res.status(200).json({
        message: 'Thank you for your vote',
        upvoted: response.rows
      });
    } catch (err) {
      res.status(400).send({
        status: 400,
        error: err.message,
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
