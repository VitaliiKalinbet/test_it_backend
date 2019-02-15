const express = require('express');
const cors = require('cors');
const router = express.Router();

const notFoundHandler = require('../middleware/not-found');
const serverErrorHandler = require('../middleware/server-error');

const Question = require('../controllers/question.controller');

router.use(cors());
router.options('*', cors());

router.get('/question', Question.getFirstQuestion);
router.get('/question/:number', Question.getQuestionByNumber);
// router.get('/question/:id', );
router.post('/answer', );

router.use(notFoundHandler);
router.use(serverErrorHandler);

module.exports = router;
