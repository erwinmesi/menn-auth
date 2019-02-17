const Joi = require('joi');

const schema = Joi.object().keys({
  passwordResetToken: Joi.string().required(),
  password: Joi.string().required()
});

module.exports = (request, response, next) => {
  const { passwordResetToken, password } = request.body;
  const { error } = Joi.validate({ passwordResetToken, password }, schema, {
    abortEarly: false
  });

  if (error) {
    return response.status(422).send({ error });
  }

  next();
};
