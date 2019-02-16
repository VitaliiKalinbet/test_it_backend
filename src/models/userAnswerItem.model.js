const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserAnswersSchema = new Schema({
  questionId: {
    type: String
  },
  typeProfession: {
    type: String
  },
});

module.exports = UserAnswersSchema;
