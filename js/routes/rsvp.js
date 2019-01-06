const express = require('express');
const routesRSVP = express.Router();
// call Joi for authotication
const Joi = require('joi');

const data = require('./data');
const {rsvps} = data;

/* RSVP End Points
================================================================================= */


// shows all questions available
routesRSVP.route('/questioner.com/api/v1/rsvps')
.get((req, res) => {
        res.send({
            status: 200, data: rsvps});
    })
// inserts a new question into the system,
.post( (req, res) => {
    const {error} = validateRsvp(req.body);
    if(error) {
        res.status(400).send({
            status: 400, Error: error.details[0].message});
        return;
    };
    const rsvp  = {
        id: rsvps.length + 1,
        meetup: req.body.meetup,
        user: req.body.user,
        response: req.body.response,
    }
    rsvps.push(rsvp);
    res.send({
        status: 200, data: rsvp});
});
// Gets a specific RSVP using the RSVP ID
routesRSVP.route('/questioner.com/api/v1/rsvps/:id')
.get( (req, res) => {
    const rsvp = rsvps.find(ele => ele.id === parseInt(req.params.id));
    if (!rsvp) res.status(404).send({
        status: 404, Error: 'No RSVP made'});
    res.send({
        status: 200, data: rsvp});
})
// updates the the exisitng RSVP
.put( (req, res) => {
    const rsvp = rsvps.find(ele => ele.id === parseInt(req.params.id));
    if (!rsvp) {
        res.status(404).send({
            status: 404, Error: 'Please RSVP: No, Yes or Maybe'});
        return;
    };
    const {error} = validateORsvp(req.body);
    if(error) {
        res.status(400).send({
            status: 400, Error: error.details[0].message});
        return;
    };
    rsvp.id = req.body.id,
    rsvp.meetup = req.body.meetup,
    rsvp.user = req.body.user,
    rsvp.response = req.body.response
    res.send({
        status: 200, data: rsvp});
})
// deletes or removes any specified  RSVP
.delete( (req, res) => {
    const rsvp = rsvps.find(ele => ele.id === parseInt(req.params.id));
    if (!rsvp) {
        res.status(404).send({
            status: 404, Error: 'Nothing to delete'});
        return;
    };
    const index = rsvps.indexOf(rsvp);
    rsvps.splice(index, 1);
    res.send({
        status: 200, data: rsvp});
});
// using Joi to validate in this RSVP
function validateRsvp(rsvp) {
    const schema = {
        id: Joi.number().required(),
        meetup: Joi.number().required(),
        user: Joi.number().min(2).required(),
        response: Joi.string().min(3).required(),
    };
    return Joi.validate(rsvp, schema);
};
/* End of Meet up End points 
-----------------------------------------------------------------------------*/

module.exports = routesRSVP;