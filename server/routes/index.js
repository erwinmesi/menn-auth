const AuthController = require('../controllers/Auth');
const NoteController = require('../controllers/Note');

const index = app => {
  app.use('/auth', AuthController);
  app.use('/notes', NoteController);
};

module.exports = index;
