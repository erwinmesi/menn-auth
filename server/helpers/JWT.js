const jwt = require('jsonwebtoken');
const config = { expiresIn: '30d' };

const JWT = {
  generate: (payload, cb) => {
    jwt.sign(payload, process.env.JWT_SECRET, config, cb);
  },

  decode: token => {
    return jwt.decode(token, { complete: true });
  },

  verify: (token, cb) => {
    jwt.verify(token, process.env.JWT_SECRET, cb);
  }
};

module.exports = JWT;
