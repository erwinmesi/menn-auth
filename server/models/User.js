const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const schema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  passwordResetToken: { type: String }
});

schema.methods.encryptPassword = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

schema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', schema);
