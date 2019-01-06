const express = require('express');
const routes = express.Router();

// call Joi for authotication
const Joi = require('joi');

// Require the data from data.js
const data = require('./data');
const {users} = data;

/* Users End Points 
============================================================================*/ 

/* GET all users and POST a specific user
------------------------------------------------------------------------------- */
routes.route('/questioner.com/api/v1/users')
    .get( (req, res) => {
        res.send({
            status: 200, data: users});
    })
// inserts a user into the syste,
    .post( (req, res) => {
    const {error} = validateUser(req.body);
    if(error) {
        res.status(400).send({
            status: 400, Error: error.details[0].message});
        return;
    };
    const user = {
        id: users.length + 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        othername: req.body.othername,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        username: req.body.username,
        registered: req.body.registered,
        isAdmin: req.body.isAdmin
    }
    users.push(user);
    res.send({
        status: 200, data: user});
});

/* GET, UDATE, DELETE a specific user
------------------------------------------------------------------------------ */
routes.route('/questioner.com/api/v1/users/:id') 
    .get((req, res) => {
        const user = users.find(ele => ele.id === parseInt(req.params.id));
        if (!user) res.status(404).send({
            status: 404, Error: 'Username or password is incorect'});
        res.send({
            status: 200, data: user});
    })
// updates the the exisitng list of user
    .put( (req, res) => {
        const user = users.find(ele => ele.id === parseInt(req.params.id));
        if (!user) {
            res.status(404).send({ status: 404, Error: 'invalid user'});
            return;
        };
        const {error} = validateOrder(req.body);
        if(error) {
            res.status(400).send({
                status: 400, Error: error.details[0].message});
            return;
        };
        user.id = req.body.id,
        user.firstname = req.body.firstname,
        user.lastname = req.body.lastname,
        user.othername = req.body.othername,
        user.email = req.body.email,
        user.phoneNumber = req.body.phoneNumber,
        user.username = req.body.username,
        user.registered = req.body.registered,
        user.isAdmin = req.body.isAdmin
        res.send(user);
    })
// deletes or removes any specified user
    .delete( (req, res) => {
        const user = users.find(ele => ele.id === parseInt(req.params.id));
        if (!user) {
            res.status(404).send({
                status: 404, Error: 'Nothing to delete'});
            return;
        };

        const index = users.indexOf(user);
        users.splice(index, 1);
        res.send({
            status: 200, data: user});
    });
// using Joi to validate in this function
function validateUser(user) {
    const schema = {
        id: Joi.number().required(),
        firstname: Joi.string().min(2).required(),
        lastname: Joi.string().min(2).required(),
        othername: Joi.string().min(2).valid('').optional(),
        email: Joi.string().min(2).email().required(),
        phoneNumber: Joi.number().min(3).required(),
        username: Joi.string().min(2).required(),
        registered: Joi.date().required(),
        isAdmin: Joi.boolean().invalid(false).required()
    };
    return Joi.validate(user, schema);
};
/* End of Users up End points 
-----------------------------------------------------------------------------*/
module.exports = routes;