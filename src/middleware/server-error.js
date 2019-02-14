const messages = {
  serverError: 'Server error'
};

const serverErrorHandler = (err, req, res) => {
  console.log(messages.serverError, err.stack);

  res.status(500).json({
    err: messages.serverError
  });
};

module.exports = serverErrorHandler;
