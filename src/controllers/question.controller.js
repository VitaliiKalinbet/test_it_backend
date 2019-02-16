/* eslint-disable no-unused-vars */
const Questions = require('../models/questions.model');

module.exports.getQuestionByNumber = async ( req, res ) => {
    const dataSend = {};
    const getQuestionByNumber = await Questions.findOne({
      questionNumber: req.params.number
    }).lean();

    dataSend.question = getQuestionByNumber;

    if (getQuestionByNumber) {
      res.status(200).json(dataSend);
    }
};

module.exports.getFirstQuestion = async ( req, res ) => {
  const dataSend = {};

  const questionCount = await Questions.find().exec(function (err, results) {
    if (err) console.log(err);

    const count = results.length;
    dataSend.countQuestion = count;
  });

  const getFirst = await Questions.find().lean().exec();

  dataSend.question = getFirst;
  dataSend.userAnswerId = 'kjhlasfdkljhasdflkjhaf';


  if (getFirst) {
    return res.status(200).json(dataSend);
  }
};


