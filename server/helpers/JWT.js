const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./../env');
const config = { expiresIn: '30d' };

const JWT = {
  generate: (payload, cb) => {
    jwt.sign(payload, JWT_SECRET, config, cb);
  },

  decode: token => {
    return jwt.decode(token, { complete: true });
  },

  verify: (token, cb) => {
    jwt.verify(token, JWT_SECRET, cb);
  }
};

module.exports = JWT;
