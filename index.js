// Import modules
const express = require('express');
require('dotenv').config();
const app = express();
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

// Environment Variables
const { config } = require('./config/index');

// setttings
app.listen(config.port, () =>
  console.log(`Server runing on port ${config.port}`)
);

// Middlewares
app.use(express.json());
app.use(logger('dev'));
app.use(express.static('public'));
app.set('trust proxy', 1);
app.use(
  cors({
    origin: `${config.clientUrl}`,
  })
);

// parsing application/json
app.use(
  express.urlencoded({
    extended: true,
  })
);

// connect to database
mongoose.connect(
  config.dbConnection,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log('MongoDB connection stablished');
  }
);

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/github', require('./routes/github'));
app.use('/api/user', require('./routes/user'));
