const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  content: { type: String, required: true },
  userId: { type: String, required: true }
});

module.exports = mongoose.model('Note', schema);
