const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserAnswers = new Schema({
  idQuestion: {type: String, required: true},
  idAnswer: {type: String, required: true},
},
{
  timestamps: true,
});

module.exports = UserAnswers;
