const ProfessionDescr = require('../models/professionDescr.model');

module.exports.setNewProf = (req, res) => {
  const data = req.body;
  console.log(data);
  ProfessionDescr.create(
    data
  );

  res.status(200);
};

