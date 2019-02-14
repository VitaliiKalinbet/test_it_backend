const express = require('express');
const router = express.Router();


const notFoundHandler = require('../middleware/not-found');
const serverErrorHandler = require('../middleware/server-error');

router.use(notFoundHandler);
router.use(serverErrorHandler);

module.exports = router;
