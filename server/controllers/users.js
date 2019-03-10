import moment from 'moment';

import uuidv4 from 'uuidv4';

import db from '../db';

import Helper from '../helpers/helper';

import Validate from '../helpers/utils';

moment.suppressDeprecationWarnings = true;
const UserQuery = {
  // Get all users from the database
  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM users';
    try {
      const { rows, rowCount } = await db.query(findAllQuery);
      return res.status(200).send({
        status: 200,
        data: {
          user: rows,
          length: rowCount
        }
      });
    } catch(error) {
      return res.status(400).send(error);
    }
  },
  // Get a specific user from the database
  async getOne(req, res) {
    const text = 'SELECT * FROM users WHERE u_id = $1';
    try {
      const { rows } = await db.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({
          status: 200,
          data: {
            'message': 'user not found'
          }
        });
      }
      return res.status(200).send({
        status: 200,
        data: {
          user:rows
        }
      });
    } catch(error) {
      return res.status(400).send(error);
    }
  },
  // created a user and insert a user in the database
  async create(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({
        status: 400,
        data: {
          'message': 'Some values are missing'
        }
      });
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ 'message': 'Please enter a valid email address' });
    }
    const hashPassword = Helper.hashPassword(req.body.password);
    const createQuery = `INSERT INTO
      users(u_id, firstname, lastname, email, password, phonenumber, modified, username, isadmin, othername)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      returning *`;
    const values = [
      uuidv4(),
      req.body.firstname,
      req.body.lastname,
      req.body.email,
      hashPassword,
      req.body.phonenumber,
      moment(new Date()),
      req.body.username,
      req.body.isadmin,
      req.body.othername
    ];

    try {
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
      const { rows } = await db.query(createQuery, values);
      const token = Helper.generateToken(rows[0].u_id);
      return res.status(201).send({
        status: 201,
        token,
        data:{
          message: 'Successfully Created',
          user:rows
        }
      });
    } catch(error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({
          status: 400,
          data: {
            'message': 'username or email already exists'
          }
        });
      }
      return res.status(400).send({
        status: 400,
        data: {
          error: error.message
        }
      });

    }
  },
  // Update a specific user
  async update(req, res) {
    const updatedme=await db.query('SELECT * FROM users WHERE u_id=$1',[req.params.id]);
    if(updatedme.rows.length==0){
      return res.status(404).send({
        status: 404,
        data: {
          error:'User not found'
        }
      });
    }
    const validation = Validate._validateUser;
    const {error} = validation(req.body);
    if(error){
      const {details} = error;
      const messages = [];
      details.forEach(detail => {
        messages.push(detail.message);
      });
      res.status(400).send({
        status: 400,
        error: messages
      });
    }
    const hashPassword=Helper.hashPassword(req.body.password);
    const update=await db.query(`UPDATE users set email = $1, password = $2, username = $3, lastname = $4,
		firstname = $5, phonenumber = $6, othername = $7, modified= $8 WHERE u_id = $9 returning *`,
    [
      req.body.email,
      hashPassword,
      req.body.username,
      req.body.lastname,
      req.body.firstname,
      req.body.phonenumber,
      req.body.othername,
      moment(new Date()),
      req.params.id]);
    if(update){
      return res.status(200).send({
        status: 200,
        data: {
          message: 'Successfully updated  a user',
          user:	update.rows
        }
      });
    }
  },
  // Delete a user from the database
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM users WHERE u_id=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id]);
      if(!rows[0]) {
        return res.status(404).send({
          status: 404,
          data: {
            'message': 'User not found',
            user: rows
          }
        });
      }
      return res.status(200).send({
        status: 200,
        data: {
          message: 'Successfully Deleted',
          user: rows

        }

      });

    } catch(error) {

      return res.status(400).send(error);
    }
  },
  // Login into your account
  async login(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(403).send({
        status: 403,
        data: {
          message: 'Some values are missing'
        }
      });
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(401).send({ 'message': 'Please enter a valid email address' });
    }
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(401).send({
          status: 401,
          data: {
            message: 'The credentials you provided are incorrect'
          }
        });
      }
      if(!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(401).send({
          status: 401,
          data: {
            message: 'The credentials you provided are incorrect'
          }
        });
      }
      const payload={
        userId:rows[0].u_id,
        username:rows[0].username,
        email:rows[0].email,
        firstname:rows[0].firstname
      };
      const token = Helper.generateToken(payload);
      return res.status(202).send({
        status: 202,
        token,
        data: {
          message: 'Successfully logged in',
          user:rows
        }
      });
    } catch(error) {
      return res.status(400).send(error);
    }
  }
};

export default UserQuery;
