const messages = {
  notFound: 'Not found'
};

const notFoundHandler = (req, res) =>  {
  res.status(404).json({
    err: messages.notFound
  });
};

module.exports = notFoundHandler;
