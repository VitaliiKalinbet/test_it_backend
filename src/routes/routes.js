const express = require('express');
const router = express.Router();
const passport = require('passport');

const UserController = require('../controllers/user');

const notFoundHandler = require('../middleware/not-found');
const serverErrorHandler = require('../middleware/server-error');

const passportCheck = passport.authenticate('jwt', {
  session: false
});

// Routes Not checked JWT
router.post('/register', UserController.user_signup);
router.post('/login', UserController.user_login);
router.get('/logout', UserController.user_logout);
router.post('/forgot', UserController.forgot);
router.get('/reset/:token', UserController.reset);

// Routes Must have checked function of JWT exp
router.put('/change', passportCheck, UserController.user_change_password);
router.get('/user/:id', passportCheck, UserController.getUser);
router.get('/dashboard', passportCheck, function (req, res) {
  res.status(200).json(req.user);
});


router.use(notFoundHandler);
router.use(serverErrorHandler);

module.exports = router;
