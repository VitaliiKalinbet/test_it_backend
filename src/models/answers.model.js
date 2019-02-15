const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let answerSchema = new Schema({
  title: {
    type: String,
    lowercase: true, // Always convert test to lowercase
  },
});

module.exports = answerSchema;
