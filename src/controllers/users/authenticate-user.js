const User = require('../../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  User.findOne({
    email: req.body.email
  }, function (err, userInfo) {
    if (err) {
      next(err);
    } else {
      if (bcrypt.compareSync(req.body.password, userInfo.password)) {
        const token = jwt.sign({
          id: userInfo._id
        }, req.app.get('secretKey'), {
          expiresIn: '1h'
        });
        res.json({
          status: 'success',
          message: 'user found!!!',
          data: {
            user: userInfo,
            token: token
          }
        });
      } else {
        res.json({
          status: 'error',
          message: 'Invalid email/password!!!',
          data: null
        });
      }
    }
  });
};

module.exports = authenticateUser;
