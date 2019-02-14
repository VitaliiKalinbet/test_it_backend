const config = require('../config/config');
const startServer = require('./modules/server/start-server');
const connectToDB = require('./modules/db/connect-db');

startServer(config);
connectToDB(config);
