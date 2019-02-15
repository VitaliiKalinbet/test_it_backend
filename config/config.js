module.exports = {
  db_host: 'mongodb://test_it_team:test_it_team123456@ds049744.mlab.com:49744/test_it',
  dbData: {
    url: 'mongodb://test_it_team:test_it_team123456@ds049744.mlab.com:49744/test_it',
    user: 'test_it_team',
    pass: 'test_it_team123456',
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
