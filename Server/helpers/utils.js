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
			othername: Joi.string().min(2).optional(),
			email: Joi.string().min(2).email().required().trim(),
			phonenumber: Joi.number().min(3).required(),
			password: Joi.string().min(5).required(),
			username: Joi.string().min(2).required().trim(),
			isadmin: Joi.boolean()
		};
		return Joi.validate(user, schema, { abortEarly: false });
	}

	_validateRsvp(rsvp) {
		const schema = {
			status: Joi.string().min(3).required().trim(),
		};
		return Joi.validate(rsvp, schema, { abortEarly: false });
	}
}


module.exports = new ValidateQuestion();


