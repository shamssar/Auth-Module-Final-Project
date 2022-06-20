'use strict';

const express = require('express');

// Esoteric Resources
const logger=require('./auth/middleware/logger');
const errorHandler = require('./error-handlers/500');
const notFound = require('./error-handlers/404');
const authRoutes = require('./routes/index.js');

// Prepare the express app
const app = express();


app.use(express.json());

const router = require('./api.v1/router/v1');
const routerV2=require('./api.v1/router/v2')
// Routes
app.use(authRoutes);
app.use('/api/v1',router);
app.use('/api/v2',routerV2);
// Catchalls
app.use(logger)
app.use(notFound);
app.use(errorHandler);




module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};