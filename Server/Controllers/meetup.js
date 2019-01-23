const moment = require('moment');
const uuidv4 = require('uuidv4');
moment.suppressDeprecationWarnings = true;

const db = require('../db/index');

const UserController = {
	// Create a meetup
	async create(req, res) {
		const createQuery = `INSERT INTO
          meetups(m_id, topic, images, location, createdon, happeningon, createdby)
          VALUES($1, $2, $3, $4, $5, $6, $7)
          returning *`;
		const values = [
			uuidv4(),
			req.body.topic,
			req.body.images,
			req.body.location,
			moment(new Date()),
			moment(new Date()),
			req.user.userId
		];
    
		try {
			const { rows } = await db.query(createQuery, values);
			return res.status(201).send(rows[0]);
		} catch(error) {
			return res.status(400).send(error);
		}
	},
};

module.exports = UserController;