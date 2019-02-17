/* eslint-disable id-length */
const UserAnswers = require('../models/userAnswers.model');
const ProfessionDescr = require('../models/professionDescr.model');

module.exports.saveUserAnswerInDB = async (req, res) => {
  const answerArr = [...req.body.answers];

  const result = {
    tester: answerArr.filter(item => item.typeProfession === 'А').length * 5,
    frontend: answerArr.filter(item => item.typeProfession === 'Б').length * 5,
    backend: answerArr.filter(item => item.typeProfession === 'В').length * 5,
    manager: answerArr.filter(item => item.typeProfession === 'Г').length * 5,
  };

  const getMax = object => {
    return Object.keys(object).filter(x => {
      return object[x] === Math.max.apply(null,
        Object.values(object));
    });
  };

  const profession = [];

  await getMax(result).forEach(async (key) => {
    await ProfessionDescr.findOne({typeProfession: key}, function(err, obj) {
      const prof = obj;
      profession.push(prof);
    });
  });

  await UserAnswers.findOneAndUpdate({
      _id: req.body.userAnswersId,
    }, {
      answers: req.body.answers,
      result,
      profession,
    },
    {useFindAndModify: false},
    function(err) {
      if (err) console.log(err);
      res.status(200).json({result, profession});
    });
};
