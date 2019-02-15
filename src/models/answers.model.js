const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswersSchema = new Schema({
  answerTitle: {
    type: String,
    required: true
  },
  typeProfession: {
    type: String,
    required: true
  }
});

// const Answers = mongoose.model('Answers', AnswersSchema, 'answers');

module.exports = AnswersSchema;
