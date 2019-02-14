const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const passport = require('passport');
const router = require('../../routes/routes');
const app = require('../app');

require('dotenv').config();

const messages = {
  server: {
    startSuccess: 'Server started on port'
  }
};

const setupCORSForDevelopment = developmentUrl => {
  const corsOptions = {
    origin: developmentUrl,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Content-Length',
      'X-Requested-With',
      'Accept'
    ],
    methods: [
      'GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'
    ]
  };

  app.use(cors(corsOptions));
};

const startServer = config => {
  //
  const {
    client,
    server
  } = config;
  const developmentUrl = `${client.development.url}:${client.development.port}`;

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

  //Passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Bring in defined Passport Strategy
  require('../../middleware/passport')(passport);

  // API group routes
  app.use(config.apiPrefix, router);


  if (process.env.NODE_ENV === 'development') {
    setupCORSForDevelopment(developmentUrl);
  }

  const port = process.env.PORT || server.port;

  app.listen(port, () => console.log(`${messages.server.startSuccess} ${port}`));
};

module.exports = startServer;
