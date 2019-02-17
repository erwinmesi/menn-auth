const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const VerifyTokenMiddleware = require('./../middlewares/VerifyToken');
const NoteValidationMiddleware = require('./../middlewares/note/NoteValidation');

router.get('/', VerifyTokenMiddleware, (request, response, next) => {
  const { userId } = request.query;

  Note.find({ userId }, (error, notes) => {
    return response.status(200).send({ data: notes });
  });
});

router.delete('/:_id', VerifyTokenMiddleware, (request, response, next) => {
  const { _id } = request.params;

  Note.deleteOne({ _id }, (error, notes) => {
    return response.status(200).send({
      message: `Note with id: "${_id}" deleted successfully.`
    });
  });
});

router.post(
  '/',
  [VerifyTokenMiddleware, NoteValidationMiddleware],
  (request, response, next) => {
    const { userId, content } = request.body;

    const newNote = new Note();
    newNote.content = content;
    newNote.userId = userId;
    newNote.save((err, user) => {
      return response
        .status(201)
        .send({ message: 'Note created!', note: newNote });
    });
  }
);

module.exports = router;
