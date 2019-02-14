const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const User = require('../models/user.model.js');
const passport = require('passport');
const async = require('async');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Get User data by Id
module.exports.getUser = (req, res) => {
  res.status(200).json({
    id: req.user.id,
    email: req.user.email
  });
};

// Logout User
module.exports.user_logout = (req, res) => {
  req.logout();
  res.status(200).json({
    message: 'User successfully logout'
  });
};

// Register New User and Check this email have in DB
module.exports.user_signup = (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.json({
      success: false,
      message: 'Please enter email and password.'
    });
  } else {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password
    });

    if (req.body.first) {
      newUser.first = req.body.first;
    }

    if (req.body.last) {
      newUser.last = req.body.last;
    }

    if (req.body.profileImage) {
      newUser.first = req.body.profileImage;
    }

    // Attempt to save the user
    newUser.save(function (err) {
      if (err) {
        return res.status(200).json({
          success: false,
          message: 'That email address already exists.'
        });
      }
      res.json({
        success: true,
        message: 'Successfully created new user.'
      });
    });
  }
};

// Login User and get him Token for access to some route action
module.exports.user_login = (req, res) => {
  passport.authenticate('local', {
    session: false
  }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : 'Login failed',
        user: user
      });
    }

    req.login(user, {
      session: false
    }, (err) => {
      if (err) {
        res.send(err);
      }

      const token = jwt.sign(user, config.jwt_encryption, {
        expiresIn: config.jwt_expiration
      });

      return res.json({
        user,
        token
      });
    });
  })(req, res);
};

// Reset password user from user have email with link url/:token
module.exports.reset = (req, res) => {
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: {
      $gt: Date.now()
    }
  }, function (err, user) {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.status(400).json({
        message: 'Password reset token is invalid or has expired.'
      });
    }
    res.render('reset', {
      user: req.user
    });
  });
};

//Send to user email link with url+token for reset pass
module.exports.forgot = (req, res, next) => {
  async.waterfall([
    function (done) {
      crypto.randomBytes(20, function (err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function (token, done) {
      User.findOne({
        email: req.body.email
      }, function (err, user) {
        if (!user) {
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/forgot');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function (err) {
          done(err, token, user);
        });
      });
    },
    function (token, user, done) {
      const smtpTransport = nodemailer.createTransport('SMTP', {
        service: 'SendGrid',
        auth: {
          user: '!!! YOUR SENDGRID USERNAME !!!',
          pass: '!!! YOUR SENDGRID PASSWORD !!!'
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'passwordreset@demo.com',
        subject: 'Node.js Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/api/v1/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function (err) {
        req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function (err) {
    if (err) return next(err);
    res.redirect('/forgot');
  });
};

module.exports.user_change_password = (req, res) => {
  // Init Variables
  var passwordDetails = req.body;

  if (req.user) {
    if (passwordDetails.newPassword) {
      User.findById(req.user.id, function (err, user) {
        if (!err && user) {

          if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
            user.password = passwordDetails.newPassword;

            user.save(function (err) {
              if (err) {
                return res.status(422).send({
                  message: err
                });
              } else {
                req.login(user, function (err) {
                  if (err) {
                    res.status(400).send(err);
                  } else {
                    res.json({
                      message: 'Password changed successfully'
                    });
                  }
                });
              }
            });
          } else {
            res.status(422).send({
              message: 'Passwords do not match'
            });
          }

        } else {
          res.status(400).send({
            message: 'User is not found'
          });
        }
      });
    } else {
      res.status(422).send({
        message: 'Please provide a new password'
      });
    }
  } else {
    res.status(401).send({
      message: 'User is not signed in'
    });
  }
};
