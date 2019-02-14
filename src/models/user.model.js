const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const {
  Schema
} = mongoose;

const CONFIG = require('../../config/config');

const UserSchema = new Schema({
  first: {
    type: String
  },
  last: {
    type: String
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    index: true,
    unique: true,
    required: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: {
    type: String
  },
  profileImage: {
    type: String
  }
}, {
  timestamps: true
});

// Saves the user's password hashed (plain text password storage is not good)
UserSchema.pre('save', function (next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

// Create method to compare password input to password saved in database
UserSchema.methods.comparePassword = function (pw, cb) {
  bcrypt.compare(pw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    return cb(null, isMatch);
  });
};

UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSalt(10), null);
};

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.getJWT = function () {
  let expiration_time = parseInt(CONFIG.jwt_expiration);
  return 'JWT ' + jwt.sign({
    user_id: this._id
  }, CONFIG.jwt_encryption, {
    expiresIn: expiration_time
  });
};

UserSchema.methods.toWeb = function () {
  let json = this.toJSON();
  json.id = this._id; //this is for the front end
  return json;
};
const User = mongoose.model('User', UserSchema, 'users');

module.exports = User;
