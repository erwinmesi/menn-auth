const jwtHelper = require('./../helpers/JWT');
module.exports = (request, response, next) => {
  const bearer = request.headers['authorization'];
  const token = bearer ? bearer.split(' ')[1] : '';

  jwtHelper.verify(token, (error, tokenData) => {
    if (error) {
      return response.status(401).send({ error });
    }

    request.tokenData = tokenData;
    next();
  });
};
