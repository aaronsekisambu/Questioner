const moment = require('moment');
const uuidv4 = require('uuidv4');
const db = require('../db');
const Helper = require('../helpers/helper');
moment.suppressDeprecationWarnings = true;

const UserQuery = {
	async getOne(req, res) {
		const text = 'SELECT * FROM users WHERE id = $1';
		try {
			const { rows } = await db.query(text, [req.params.id, req.user.id]);
			if (!rows[0]) {
				return res.status(404).send({'message': 'user not found'});
			}
			return res.status(200).send({status: 200, data: rows[0]});
		} catch(error) {
			return res.status(400).send(error);
		}
	},
	async create(req, res) {
		if (!req.body.email || !req.body.password) {
			return res.status(400).send({'message': 'Some values are missing'});
		}
		if (!Helper.isValidEmail(req.body.email)) {
			return res.status(400).send({ 'message': 'Please enter a valid email address' });
		}
		const hashPassword = Helper.hashPassword(req.body.password);
		const createQuery = `INSERT INTO
      users(id, firstname, lastname, othernames, email, password, phonenumber, registeredon, modified_date, isadmin)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      returning *`;
		const values = [
			uuidv4(),
			req.body.firstname,
			req.body.lastname,
			req.body.othername,
			req.body.email,
			hashPassword,
			req.body.phonenumber,
			moment(new Date()),
			moment(new Date()),
			req.body.isadmin
		];

		try {
			const { rows } = await db.query(createQuery, values);
			const token = Helper.generateToken(rows[0].id);
			return res.status(201).send({ token });
		} catch(error) {
			if (error.routine === '_bt_check_unique') {
				return res.status(400).send({ 'message': 'User with that EMAIL already exist' });
			}
			return res.status(400).send(error);
		}
	},
 
	
};

module.exports = UserQuery;
