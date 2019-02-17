const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfessionDescrSchema = new Schema({
  typeProfession: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
    whoIsTitle: {
      type: String,
      required: true
    },
    whoIsText: {
      type: String,
      required: true
    },
    historyTitle: {
      type: String,
      required: true
    },
    historyText: {
      type: String,
      required: true
    },
    descriptionTitle: {
      type: String,
      required: true
    },
    descriptionText: {
      type: String,
      required: true
    },
    learnTitle: {
      type: String,
      required: true
    },
    learnText: {
      type: String,
      required: true
    },
    dutiesTitle: {
      type: String,
      required: true
    },
    dutiesText: {
      type: String,
      required: true
    },
    perspectivesTitle: {
      type: String,
      required: true
    },
    perspectivesText: {
      type: String,
      required: true
    }
},
{
  timestamps: true,
});

const ProfessionDescr = mongoose.model('ProfessionDescr', ProfessionDescrSchema, 'professionDescr');

module.exports = ProfessionDescr;
