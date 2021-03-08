require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 5000,
  dbConnection: process.env.MONGODB_CONNECTION_STRING,
};

module.exports = { config };
