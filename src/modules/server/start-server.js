const morgan = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const exphbs = require('express-handlebars');
const router = require('../../routes/routes');

const ResultFromEmail = require('../../controllers/resultFromEmail.controller');

const app = require('../app');

require('dotenv').config();

const messages = {
  server: {
    startSuccess: 'Server started on port'
  }
};

const startServer = config => {
  const { server } = config;

  app.engine('handlebars', exphbs());
  app.set('view engine', 'handlebars');

  // Use public Html Css Js files
  app.use('/', express.static('public'));

  // Use body-parser to get POST requests for API use
  app.use(express.urlencoded({
    extended: true
  }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(flash());

  // Log requests to console
  app.use(morgan('dev'));

  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  app.use('/result/:userAnswerId', ResultFromEmail.getResultById);
  // API group routes
  app.use(config.apiPrefix, router);

  const port = process.env.PORT || server.port;

  app.listen(port, () => console.log(`${messages.server.startSuccess} ${port}`));
};

module.exports = startServer;
