const express = require('express');
const routesQuestions = express.Router();
// call Joi for authotication
const Joi = require('joi');

// Require the data from data.js
const data = require('./data');
const {questions} = data;

/* Questions End Points
================================================================================= */
// shows all questions available
routesQuestions.route('/questioner.com/api/v1/questions')
.get((req, res) => {
        res.send({
            status: 200, 
            data: questions});
    })
// inserts a new question into the system,
.post( (req, res) => {
    const {error} = validateQuestion(req.body);
    if(error) {
        return res.status(400).send({
        status: 400, Error: error.details[0].message});

    };
    const question  = {
        id: questions.length + 1,
        createdOn: req.body.createdOn,
        createdBy: req.body.createdBy,
        meetup: req.body.meetup,
        title: req.body.title,
        body: req.body.body,
        votes: req.body.votes,
    }
    questions.push(question);
    res.send({
        status: 200, data: question});
});
// Gets a specific question using the question ID
routesQuestions.route('/questioner.com/api/v1/questions/:id')
.get( (req, res) => {
    const question = questions.find(ele => ele.id === parseInt(req.params.id));
    if (!question) {
       return res.send({ 
            status: 404, 
            error:'Username or password is incorect'});
        }
   return res.send({
     status: 200, 
     data: question});
})
// updates the the exisitng list of user
.put( (req, res) => {
    const question = questions.find(ele => ele.id === parseInt(req.params.id));
    if (!question) {
        res.status(404).send({ 
            status: 404,
            message: 'No Question currently'});
        return;
    };
    const {error} = validateQuestion(req.body);
    if(error) {
        res.status(400).send({
            status: 400,
            error: error.details[0].message});
        return;
    };
    question.id = req.body.id,
    question.createdOn = req.body.createdOn,
    question.createdBy = req.body.createdBy,
    question.meetup = req.body.meetup,
    question.title = req.body.title,
    question.body = req.body.body, 
    question.votes = req.body.votes
    res.send({
        status: 200, data: question});
})
// deletes or removes any specified user
.delete( (req, res) => {
    const question = meetups.find(ele => ele.id === parseInt(req.params.id));
    if (!question) {
        res.status(404).send({
            status:  404, Error: 'Nothing to delete'});
        return;
    };
    const index = questions.indexOf(question);
    meetups.splice(index, 1);
    res.status(200).send({
        status:  200, data: question});
});
// PATCH the Questions with an upvote or downvote
routesQuestions.route('/questioner.com/api/v1/questions/:id/upvote')
.get((req, res) => {
    const vote = votes.find(ele => ele.upvote === parseInt(req.params.upvote));
    if (!vote) res.status(404).send({
        status: req.statusCode = 404, 
        Error: 'No vote made'});
    res.send({
        status:  200,
        data: vote}); 
})
// inserts a new question into the system,
.patch( (req, res) => {
    const vote = votes.find(ele => ele.upvote === parseInt(req.params.upvote));
    if (!vote) {
        res.status(404).send({
            status: 404, 
            Error: 'No vote made'});
        return;
    };
    const {error} = validateVotes(req.body);
    if(error) {
        res.status(400).send({
            status:400,
             Error: error.details[0].message});
        return;
    };
    vote.status = req.body.status,
    vote.data = req.body.data,
    vote.title = req.body.title,
    vote.body = req.body.body,
    vote.votes = req.body.votes
    res.send({
        status: 200, 
        data: vote});
})
routesQuestions.route('/questioner.com/api/v1/questions/:id/downvote')
.get((req, res) => {
    const vote = votes.find(ele => ele.downvote === parseInt(req.params.downvote));
    if (!vote) res.status(404).send({
        status: req.statusCode = 404, 
        Error: 'No vote made'});
    res.send({
        status:  200,
        data: vote}); 
})
// Down vote patch,
.patch( (req, res) => {
    const vote = votes.find(ele => ele.downvote === parseInt(req.params.downvote));
    if (!vote) {
        res.status(404).send({
            status: 404, 
            Error: 'No vote made'});
        return;
    };
    const {error} = validateVotes(req.body);
    if(error) {
        res.status(400).send({
            status:400,
             Error: error.details[0].message});
        return;
    };
    vote.status = req.body.status,
    vote.data = req.body.data,
    vote.title = req.body.title,
    vote.body = req.body.body,
    vote.votes = req.body.votes
    res.send({
        status: 200, 
        data: vote});
})
// using Joi to validate the question function
function validateQuestion(question) {
    const schema = {
        id: Joi.number().required(),
        createdOn: Joi.date().required(),
        createdBy: Joi.number().min(1).required(),
        meetup: Joi.number().min(1),
        title: Joi.string().min(2).required(),
        body: Joi.string().min(2).required(),
        votes: Joi.number().min(1).required()
    };
    return Joi.validate(question, schema);
};
// using Joi to validate  votes patch
function validateVotes(vote) {
    const schema = {
        status: Joi.number().required(),
        data: Joi.array().ordered(Joi.object(
            {
                meetup: Joi.number().required(),
                title: Joi.string().required(),
                body: Joi.string().required(),
                votes: Joi.number().required(),
             })),
    };
    return Joi.validate(vote, schema);
};
/* End of Meet up End points 
-----------------------------------------------------------------------------*/

module.exports = routesQuestions;