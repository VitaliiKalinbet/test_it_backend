/* eslint-disable id-length */
const UserAnswer = require('../models/userAnswers.model');
const ProfessionDescr = require('../models/professionDescr.model');

module.exports.getResultById = async (req, res) => {
  const getMax = object => {
    return Object.keys(object).filter(x => {
      return object[x] === Math.max.apply(null,
        Object.values(object));
    });
  };
  const profession = [];
  const resData = {};

  await UserAnswer.findById(req.params.userAnswerId, function (err, obj) {
    if (err) console.log(err);
    resData.userData = obj;
  });

  await getMax(resData.userData.result).forEach((key) => {
    let supDoc = ProfessionDescr.findOne({
      typeProfession: key
    }).lean().exec(function(err, doc) {
      if (err) console.log(err);
      console.log('in forEachProm: ',doc);
      return doc;
    });
    console.log(supDoc);
  });

  resData.profession = profession;
  const send = async (data) => {
    await res.status(200).json(data);
  };
  await send(resData);

};
