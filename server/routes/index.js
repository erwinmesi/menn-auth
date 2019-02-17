const AuthController = require('../controllers/Auth');
const NoteController = require('../controllers/Note');

const index = app => {
  app.use('/api/auth', AuthController);
  app.use('/api/notes', NoteController);
};

module.exports = index;
