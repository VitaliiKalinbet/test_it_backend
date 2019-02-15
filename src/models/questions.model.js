let mongoose = require('mongoose');
let AnswerSchema = require('./answers.model');
let Schema = mongoose.Schema;

let questionSchema = new Schema({
  qustionBody: {
    type: String,
    lowercase: true, // Always convert test to lowercase
  },
  answers: [AnswerSchema],
});

module.exports = questionSchema;
