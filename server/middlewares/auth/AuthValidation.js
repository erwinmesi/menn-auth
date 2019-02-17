const Joi = require('joi');

const schema = Joi.object().keys({
  password: Joi.string().required(),
  email: Joi.string()
    .email()
    .required()
});

module.exports = (request, response, next) => {
  const { email, password } = request.body;
  const { error, value } = Joi.validate({ email, password }, schema, {
    abortEarly: false
  });

  if (error) {
    return response.status(401).send({ error });
  }

  next();
};
