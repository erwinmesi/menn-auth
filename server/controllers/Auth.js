const RefreshTokenMiddleware = require('./../middlewares/RefreshToken');
const AuthValidationMiddleware = require('./../middlewares/auth/AuthValidation');
const ResetPasswordValidationMiddleware = require('./../middlewares/auth/ResetPasswordValidation');
const SendPasswordResetLinkValidationMiddleware = require('./../middlewares/auth/SendPasswordResetLinkValidation');
const express = require('express');
const router = express.Router();
const jwtHelper = require('./../helpers/JWT');
const resetPasswordHelper = require('./../helpers/ResetPassword');
const { expectedError } = require('./../helpers/Response');
const User = require('./../models/User');
const { sendPasswordResetLink } = require('./../helpers/Mailer');
var sha512 = require('js-sha512');

router.post('/login', AuthValidationMiddleware, (request, response, next) => {
  const { email, password } = request.body;

  User.findOne({ email }, (error, user) => {
    if (error || !user) {
      return response
        .status(401)
        .send(expectedError('Authentication Failed', 'User not found.'));
    }

    const passwordValid = user.validatePassword(password || '');
    if (!passwordValid) {
      return response
        .status(401)
        .send(
          expectedError('Authentication Failed', 'Wrong user credentials.')
        );
    }

    return generateToken({ user }, response);
  });
});

router.post(
  '/register',
  AuthValidationMiddleware,
  (request, response, next) => {
    const { email, password } = request.body;

    User.findOne({ email }, (error, user) => {
      if (!error && user) {
        return response
          .status(422)
          .send(
            expectedError('Authentication Failed', 'Email already exists.')
          );
      }

      const newUser = new User();
      newUser.email = email;
      newUser.password = newUser.encryptPassword(password);
      newUser.save((err, user) => {
        generateToken({ user }, response);
      });
    });
  }
);

router.get('/logout', (request, response, next) => {
  return response.send({ message: 'Logged out!' });
});

router.get(
  '/refresh-token',
  RefreshTokenMiddleware,
  (request, response, next) => {
    const { user } = request.decodedToken.payload;
    jwtHelper.generate({ user }, (err, token) => {
      return response.json({ token });
    });
  }
);

router.post(
  '/send-password-reset-link',
  [SendPasswordResetLinkValidationMiddleware],
  (request, response, next) => {
    const { email: recipient } = request.body;

    generatePasswordResetToken(recipient, async token => {
      await User.findOne({ email: recipient }, (err, user) => {
        if (!setPasswordResetTokenToUser(token, user, response)) {
          return null;
        }
      });

      const mail = {
        subject: 'Reset Password',
        senderEmail: process.env.APP_EMAIL,
        recipient,
        senderName: process.env.APP_NAME,
        content: resetPasswordHelper.getContent(
          `${process.env.FRONT_END_URL}/reset-password/${token}`
        )
      };

      return sendPasswordResetLink(mail)
        .then(() => {
          return response
            .status(201)
            .send({ message: 'Password reset link sent!' });
        })
        .catch(() => {
          return response
            .status(500)
            .send(expectedError('Notification failed', 'Email not sent.'));
        });
    });
  }
);

router.post(
  '/reset-password',
  [ResetPasswordValidationMiddleware],
  async (request, response, next) => {
    const { passwordResetToken, password } = request.body;

    await User.findOne({ passwordResetToken }, (err, user) => {
      if (err || !user) {
        return response
          .status(401)
          .send(
            expectedError('Request failed', 'Cannot validate user identity.')
          );
      }

      user.password = user.encryptPassword(password);
      user.passwordResetToken = null;
      user.save();
      return response
        .status(200)
        .send({ message: 'Password reset successfully!' });
    });
  }
);

const setPasswordResetTokenToUser = (token, user, response) => {
  if (!user) {
    response
      .status(404)
      .send(expectedError('Request failed', 'User not found.'));

    return false;
  }

  user.passwordResetToken = token;
  user.save();
  return true;
};

const generatePasswordResetToken = (recipient, callback) => {
  const token = sha512(JSON.stringify({ recipient, id: new Date() }));
  callback(token);
};

const generateToken = ({ user }, response) => {
  const { _id, email } = user;
  const data = {
    _id,
    email
  };

  jwtHelper.generate({ user }, (err, token) => {
    delete user.password;
    return response.status(201).send({ token, data });
  });
};

module.exports = router;
