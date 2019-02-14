const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');
const config = require('../../config/config');

// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.jwt_encryption;

  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findById(jwt_payload.id, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function (email, password, cb) {
      //Assume there is a DB module providing a global UserModel
      return User.findOne({
          email
        })
        .then(user => {
          if (!user) {
            return cb(null, false, {
              message: 'Incorrect email or password.'
            });
          }
          user.comparePassword(password, function (err, isMatch) {
            if (!isMatch) {
              return cb(null, false, {
                message: 'Incorrect email or password.'
              });
            }
            const userData = {
              id: String(user._id),
              email: user.email
            };

            if (user.first) {
              userData.firstName = user.first;
            }

            if (user.last) {
              userData.lastName = user.last;
            }

            if (user.profileImage) {
              userData.profileImage = user.profileImage;
            }
            if (isMatch && !err) {
              return cb(null, userData, {
                message: 'Logged In Successfully'
              });
            }
          });
        })
        .catch(err => {
          return cb(err);
        });
    }
  ));
};
