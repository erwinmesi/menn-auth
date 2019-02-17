const Joi = require('joi');

const schema = Joi.object().keys({
  content: Joi.string().required(),
  userId: Joi.string().required()
});

module.exports = (request, response, next) => {
  const { content, userId } = request.body;
  const { error, value } = Joi.validate({ content, userId }, schema, {
    abortEarly: false
  });

  if (error) {
    return response.status(401).send({ error });
  }

  next();
};
