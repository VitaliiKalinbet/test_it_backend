const UserAnswers = require('../models/userAnswers.model');

module.exports.saveUserAnswerInDB = (req, res) => {
  const answerArr = [...req.body.answers];
  const result = {
    tester: answerArr.filter(item => item.typeProfession === 'А').length * 5,
    frontend: answerArr.filter(item => item.typeProfession === 'Б').length * 5,
    backend: answerArr.filter(item => item.typeProfession === 'В').length * 5,
    manager: answerArr.filter(item => item.typeProfession === 'Г').length * 5,
  };
  UserAnswers.findOneAndUpdate({
    _id: req.body.userAnswerId
  }, {
    answers: req.body.answers,
    result
  },
  { useFindAndModify: false},
   function (err) {
    if (err) console.log(err);
  });
  res.status(200).json(result);
};
