const jwtHelper = require('./../helpers/JWT');
const { expectedError } = require('./../helpers/Response');

module.exports = (request, response, next) => {
  const bearer = request.headers['authorization'];
  const token = bearer ? bearer.split(' ')[1] : '';

  if (!bearer) {
    return response
      .status(400)
      .send(expectedError('Authentication Failed', 'Token not provided.'));
  }

  const decodedToken = jwtHelper.decode(token);
  if (!decodedToken) {
    return response
      .status(400)
      .send(expectedError('Authentication Failed', 'Invalid token.'));
  }

  request.decodedToken = decodedToken;
  next();
};
