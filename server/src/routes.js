const path = require('path');
const express = require('express');
const authenticationController = require('./controllers/authenticationController');
const authenticationControllerPolicy = require('./middleware/authenticationControllerPolicy');
const qappController = require('./controllers/qappController');
const structureController = require('./controllers/structureController');
const isAuthenticated = require('./middleware/isAuthenticated');

module.exports = (app) => {
  // serve up built Vue files from express server
  app.use('/', express.static(path.resolve(__dirname, '../../client/dist')));

  // auth routes
  app.post('/auth/register', authenticationControllerPolicy.register, authenticationController.register);
  app.post('/auth/login', authenticationController.login);
  app.get('/auth/user', isAuthenticated, authenticationController.user);
  app.post('/auth/logout', isAuthenticated, authenticationController.logout);

  // qapp routes
  app.get('/api/qapps', isAuthenticated, qappController.index);
  app.get('/api/qapps/:id', isAuthenticated, qappController.show);
  app.post('/api/qapps', isAuthenticated, qappController.store);
  app.delete('/api/qapps', isAuthenticated, qappController.destroy);

  // structure (outlines/questions) routes
  app.get('/api/sections', isAuthenticated, structureController.sections);
  app.get('/api/questions', isAuthenticated, structureController.questions);
};
