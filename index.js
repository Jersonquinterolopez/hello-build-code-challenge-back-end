// Import modules
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');

// Environment Variables
const { config } = require('./config/index');

// setttings
app.listen(config.port, () =>
  console.log(`Server runing on port ${config.port}`)
);

// Middlewares
app.use(express.json());
app.use(cors());
app.use(logger('dev'));
app.use(express.static('public'));

// parsing application/json
app.use(bodyParser.json());

// routes
