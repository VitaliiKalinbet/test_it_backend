const mongoose = require('mongoose');
const Answers = require('./answers.model');
const Schema = mongoose.Schema;

const QuestionsSchema = new Schema({
  questionNumber: {
    type: Number,
    required: true
  },
  questionTitle: {
    type: String,
    required: true
  },
  answers: [Answers],
},
{
  timestamps: true
});

const Questions = mongoose.model('Questions', QuestionsSchema, 'questions');

module.exports = Questions;
