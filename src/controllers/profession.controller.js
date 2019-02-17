const ProfessionDescr = require('../models/professionDescr.model');

const setNewProf = (req, res) => {
  const data = req.body;

  console.log(data);

  ProfessionDescr.create(data);

  res.status(200).json({ kol: 'some' });
};

module.exports = {
  getProfessionDescr: setNewProf
};
