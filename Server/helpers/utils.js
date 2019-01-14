// call Joi for authotication
const Joi = require('joi');



class ValidateQuestion {
// using Joi to validate the question function
    _validateQuestion(question) {
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
    // using Joi to validate in this function
    _validateMeetup(meetup) {
    const schema = {
        id: Joi.number().required(),
        location: Joi.string().min(2).required(),
        happeningOn: Joi.date().required(),
        topic: Joi.string(),
        tags: Joi.string().min(3),
    };
    return Joi.validate(meetup, schema);
};

// using Joi to validate in this function
    _validateUser(user) {
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

    _validateRsvp(rsvp) {
    const schema = {
        meetup: Joi.number().required(),
        topic: Joi.string().min(2).required(),
        status: Joi.string().min(3).required(),
    };
    return Joi.validate(rsvp, schema);
};
}


module.exports = new ValidateQuestion();


