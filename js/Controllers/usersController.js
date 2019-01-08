const UserModel = require('../models/usersModels');
const Validate = require('../utils/utils');

class UserController {
    getAllUsers (req, res) {
    const users = UserModel._users;
        res.send({
            status: 200,
            data: users});
    }
    getASpecificUser (req, res) {
        const users = UserModel._users;
        const user = users.find(ele => ele.id === parseInt(req.params.id));
        if (!user) res.status(404).send({
            status: 404, Error: 'Username or password is incorect'});
        res.send({
            status: 200, 
            data: user});
    }
    postAUser (req, res) {
        const users = UserModel._users;
        const validateUser = Validate._validateUser;
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
            status: 200, 
            data: user});
    }
    updateAUser (req, res) {
        const users = UserModel._users;
        const user = users.find(ele => ele.id === parseInt(req.params.id));
        if (!user) {
            res.status(404).send({ 
                status: 404, 
                Error: 'invalid user'});
            return;
        };
        const validateUser = Validate._validateUser;
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
    }
    deleteAUser(req, res) {
        const users = UserModel._users;
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
    }
}

module.exports = new UserController;