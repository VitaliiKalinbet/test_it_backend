/* eslint-disable no-unused-vars */
const Questions = require('../models/questions.model');
const UserAnswers = require('../models/userAnswers.model');

module.exports.getQuestionByNumber = async (req, res) => {
  const dataSend = {};
  const getQuestionByNumber = await Questions.findOne({
    questionNumber: req.params.number
  }).lean();
  dataSend.question = getQuestionByNumber;
  if (getQuestionByNumber) {
    res.status(200).json(dataSend);
  }
};

module.exports.getFirstQuestion = async (req, res) => {
  const dataSend = {};
  const getFirst = await Questions.find().lean().exec();
  dataSend.question = getFirst;
  const newUserAnswers = await new UserAnswers();
  await newUserAnswers.save(function (err, doc) {
    dataSend.userAnswersId = doc.id;
    if (getFirst) {
      res.status(200).json(dataSend);
    }
  });
};
