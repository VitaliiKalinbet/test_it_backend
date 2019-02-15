let mongoose = require('mongoose');
let UserAnswers = require('./userAnswer.model');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  answers: [UserAnswers],
},
{
  timestamps: true,
});

module.exports = userSchema;
