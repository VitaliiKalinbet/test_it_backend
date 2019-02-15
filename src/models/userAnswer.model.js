const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserAnswersSchema = new Schema({
  questionId: {
    type: String,
    required: true
  },
  answerId: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
});

const UserAnswers = mongoose.model('UserAnswers', UserAnswersSchema, 'userAnswers');

module.exports = UserAnswers;
