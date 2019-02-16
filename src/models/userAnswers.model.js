const mongoose = require('mongoose');
const UserAnswerItem = require('./userAnswerItem.model');
const Schema = mongoose.Schema;

const UserAnswersSchema = new Schema({
  result: { type: Object },
  answers: [UserAnswerItem],
},
{
  timestamps: true,
});

const UserAnswers = mongoose.model('UserAnswers', UserAnswersSchema, 'userAnswers');

module.exports = UserAnswers;
