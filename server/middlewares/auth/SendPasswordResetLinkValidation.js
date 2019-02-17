const Joi = require('joi');

const schema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required()
});

module.exports = (request, response, next) => {
  const { email } = request.body;
  const { error } = Joi.validate({ email }, schema, {
    abortEarly: false
  });

  if (error) {
    return response.status(422).send({ error });
  }

  next();
};
