// call Joi for authotication
const Joi = require('joi');



class ValidateQuestion {
// using Joi to validate the question function
	_validateQuestion(question) {
		const schema = {
			createdBy: Joi.number().min(1).required(),
			meetup: Joi.number().min(1),
			title: Joi.string().min(2).required().trim(),
			body: Joi.string().min(2).required().trim(),
			votes: Joi.number().min(0).required()
		};
		return Joi.validate(question, schema, { abortEarly: false });
	}
	// using Joi to validate in this function
	_validateMeetup(meetup) {
		const schema = {
			location: Joi.string().min(2).required().trim(),
			topic: Joi.string().required().trim(),
			tags: Joi.array().items(Joi.string(), Joi.string()),
		};
		return Joi.validate(meetup, schema, { abortEarly: false });
	}

	// using Joi to validate in this function
	_validateUser(user) {
		const schema = {
			firstname: Joi.string().min(2).required().trim(),
			lastname: Joi.string().min(2).required().trim(),
			othername: Joi.string().min(2).valid('').optional(),
			email: Joi.string().min(2).email().required().trim(),
			phoneNumber: Joi.number().min(3).required(),
			username: Joi.string().min(2).required().trim(),
			isAdmin: Joi.boolean().invalid(false)
		};
		return Joi.validate(user, schema, { abortEarly: false });
	}

	_validateRsvp(rsvp) {
		const schema = {
			meetup: Joi.number().required(),
			topic: Joi.string().min(2).required(),
			status: Joi.string().min(3).required(),
		};
		return Joi.validate(rsvp, schema);
	}
}


module.exports = new ValidateQuestion();


