module.exports = {
  db_host: '',
  dbData: {
    url: '',
    user: '',
    pass: '',
  },
  apiPrefix: '/api/v1',
  server: {
    port: '4000',
  },
  client: {
    development: {
      url: 'http://localhost',
      port: '4001',
    },
  },
  jwt_encryption: process.env.JWT_ENCRYPTION || 'jwt_please_change',
  jwt_expiration: process.env.JWT_EXPIRATION || 10000
};
