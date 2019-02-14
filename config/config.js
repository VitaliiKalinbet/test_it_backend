module.exports = {
  db_host: 'mongodb://127.0.0.1:27017/test_it',
  dbData: {
    url: 'mongodb://127.0.0.1:27017/test_it',
    user: '',
    pass: '',
  },
  apiPrefix: '/api/v1',
  server: {
    port: '41410',
  },
  client: {
    development: {
      url: 'http://localhost',
      port: '41411',
    },
  },
  jwt_encryption: process.env.JWT_ENCRYPTION || 'jwt_please_change',
  jwt_expiration: process.env.JWT_EXPIRATION || 10000
};
