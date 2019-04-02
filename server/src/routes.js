const path = require('path');
const express = require('express');
const authenticationController = require('./controllers/authenticationController');
const authenticationControllerPolicy = require('./middleware/authenticationControllerPolicy');
const dashboardController = require('./controllers/dashboardController');
const isAuthenticated = require('./middleware/isAuthenticated');

module.exports = (app) => {
  // serve up built Vue files from express server
  app.use('/', express.static(path.resolve(__dirname, '../../client/dist')));

  app.post('/auth/register',
    authenticationControllerPolicy.register,
    authenticationController.register);

  app.post('/auth/login',
    authenticationController.login);

  app.get('/auth/user',
    isAuthenticated,
    authenticationController.user);

  app.post('/auth/logout',
    isAuthenticated,
    authenticationController.logout);

  app.get('/api/qapps',
    isAuthenticated,
    dashboardController.dashboard);
  app.post('/api/qapps',
    isAuthenticated,
    dashboardController.addQapp);
};
