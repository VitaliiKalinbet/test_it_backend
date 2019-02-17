/* eslint-disable id-length */
const UserAnswer = require('../models/userAnswers.model');
const ProfessionDescr = require('../models/professionDescr.model');

const getProfessionsByMaxScores = professionObj => {
  const professionScores = Object.values(professionObj);
  const professionEntries = Object.entries(professionObj);
  const maxProfessionScore = professionScores.reduce((acc, scores) => acc < scores ? scores : acc);

  return professionEntries
    .map(
      ([
profName, score
]) => score === maxProfessionScore ? profName : null
    )
    .filter( item => !!item );
};

const getProfessionDescr = (professionName) => new Promise(res => {
  ProfessionDescr
  .findOne({ typeProfession: professionName })
  .exec(function(err, doc) {
    if (err) console.log(err);

    res(doc);
  });
});


const getAllProfessionsDescr = async (userResults) => {

  const professionsWithMaxScores = getProfessionsByMaxScores(userResults);

  if (!professionsWithMaxScores.length) {
    return [];
  }

  const promList = professionsWithMaxScores.map( profName => getProfessionDescr(profName) );

  return Promise.all(promList);
};

const getResultsById = (req, res) => {
  const userAnswerId = req.params.userAnswerId;

  const resData = {
    results: {}
  };

  const getUserAnswers = () => UserAnswer.findById(userAnswerId);

  return getUserAnswers()
    .then( async userAnswer => {
        const userResults = userAnswer.result;
        const professionDesr = await getAllProfessionsDescr(userResults);

        resData.results = {
          result: userResults,
          profession: professionDesr
        };

        res.status(200).json(resData);
    });
};

module.exports = {
  getResultsById
};
