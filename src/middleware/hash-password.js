const bcrypt = require('bcrypt');

const hashPassword = (schema) => {
  //hashing a password before saving it to the database
  schema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
};

module.exports = hashPassword;
