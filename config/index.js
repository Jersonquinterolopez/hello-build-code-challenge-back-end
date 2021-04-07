require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 5000,
  clientUrl: process.env.CLIENT_URL,
  dbConnection: process.env.MONGODB_CONNECTION_STRING,
  authJwtSecret: process.env.JWT_TOKEN,
  github_client_id: process.env.GITHUB_API_CLIENT_ID,
  github_client_secret: process.env.GITHUB_API_CLIENT_SECRET,
};

module.exports = { config };
