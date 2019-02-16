const morgan = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const router = require('../../routes/routes');
const app = require('../app');

require('dotenv').config();

const messages = {
  server: {
    startSuccess: 'Server started on port'
  }
};

const startServer = config => {
  const { server } = config;

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

  // API group routes
  app.use(config.apiPrefix, router);

  const port = process.env.PORT || server.port;

  app.listen(port, () => console.log(`${messages.server.startSuccess} ${port}`));
};

module.exports = startServer;
