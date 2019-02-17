const express = require('express');
const router = express.Router();
const cors = require('cors');
const config = require('../../config/config');

const notFoundHandler = require('../middleware/not-found');
const serverErrorHandler = require('../middleware/server-error');

const Question = require('../controllers/question.controller');
const UserAnswers = require('../controllers/answer.controller');
const SendEmail = require('../controllers/sendEmail.controller');
const ResultFromEmail = require('../controllers/resultFromEmail.controller');

const setupCORSForDevelopment = (developmentUrl) => {
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

  router.use(cors(corsOptions));
};

if (process.env.NODE_ENV === 'development') {
  const { client } = config;
  const developmentUrl = `${client.development.url}:${client.development.port}`;

  setupCORSForDevelopment(developmentUrl);
}

if (process.env.NODE_ENV === 'production') {
  // Setup CORS for production
}

router.get('/question', Question.getFirstQuestion);
router.get('/question/:number', Question.getQuestionByNumber);
// router.get('/question/:id', );
router.put('/answer', UserAnswers.saveUserAnswerInDB);
router.get('/result/:userAnswerId', ResultFromEmail.getResultById);

router.post('/send', SendEmail.sendEmail);

router.use(notFoundHandler);
router.use(serverErrorHandler);

module.exports = router;
