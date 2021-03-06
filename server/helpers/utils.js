import Joi from 'joi';

class ValidateQuestion {
// using Joi to validate the question function
  _validateQuestion(question) {
    const schema = {
      createdby: Joi.string().min(1).required(),
      title: Joi.string().min(2).required().trim(),
      body: Joi.string().min(2).required().trim(),
    };
    return Joi.validate(question, schema, { abortEarly: false });
  }

  _validateComments(comment){
    const schema = {
      body: Joi.string().min(2).required()
    };
    return Joi.validate(comment, schema, {abortEarly: false});
  }
  // using Joi to validate in this function
  _validateMeetup(meetup) {
    const schema = {
      location: Joi.string().min(2).required().trim(),
      topic: Joi.string().required().trim(),
      tags: Joi.array().items(Joi.string(), Joi.string()),
      images: Joi.string().trim(),
      createdby: Joi.string().required().trim()
    };
    return Joi.validate(meetup, schema, { abortEarly: false });
  }

  _validateRsvp(meetup) {
    const schema = Joi.object().keys({
      yes: Joi.string().min(2).required().trim(),
      no: Joi.string().required().trim(),
      maybe: Joi.array().items(Joi.string(), Joi.string())
        .xor('yes', 'no', 'maybe')
    });
    return Joi.validate(meetup, schema, { abortEarly: false });
  }

  // using Joi to validate in this function
  _validateUser(user) {
    const schema = {
      firstname: Joi.string().min(2).optional().trim(),
      lastname: Joi.string().min(2).optional().trim(),
      othername: Joi.string().min(2).optional(),
      email: Joi.string().min(2).email().required().trim(),
      phonenumber: Joi.number().min(3).optional(),
      password: Joi.string().min(5).required(),
      username: Joi.string().min(2).optional().trim(),
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


export default new ValidateQuestion();


