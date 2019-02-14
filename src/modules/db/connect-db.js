const mongoose = require('mongoose');

const messages = {
  connection: {
    success: 'Connected to DB...',
    error: 'Can not connect to the database'
  }
};

const connectDB = config => {
  const dbOption = {
    user: process.env.MONGO_DB_USER,
    pass: process.env.MONGO_DB_USER_PASS,
    useNewUrlParser: true,
    useCreateIndex: true
  };

  mongoose.connect(config.dbData.url, dbOption)
    .then(() => console.log(messages.connection.success))
    .catch(err => console.log(messages.connection.error + err));
};


module.exports = connectDB;
