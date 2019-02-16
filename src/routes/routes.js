const express = require('express');
const router = express.Router();

const notFoundHandler = require('../middleware/not-found');
const serverErrorHandler = require('../middleware/server-error');

const Question = require('../controllers/question.controller');
const UserAnswers = require('../controllers/answer.controller');

router.get('/question', Question.getFirstQuestion);
router.get('/question/:number', Question.getQuestionByNumber);
// router.get('/question/:id', );
router.put('/answer', UserAnswers.saveUserAnswerInDB);

router.use(notFoundHandler);
router.use(serverErrorHandler);

module.exports = router;
