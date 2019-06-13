const path = require('path');
const express = require('express');
const authenticationController = require('./controllers/authenticationController');
const authenticationControllerPolicy = require('./middleware/authenticationControllerPolicy');
const qappController = require('./controllers/qappController');
const structureController = require('./controllers/structureController');
const generateController = require('./controllers/generateController');
const refController = require('./controllers/refController');
const isAuthenticated = require('./middleware/isAuthenticated');

module.exports = (app) => {
  // serve up built Vue files from express server
  app.use('/', express.static(path.resolve(__dirname, '../../client/dist')));

  // auth routes
  app.post('/auth/register', authenticationControllerPolicy.register, authenticationController.register);
  app.post('/auth/login', authenticationController.login);
  app.get('/auth/user', isAuthenticated, authenticationController.user);
  app.post('/auth/user', isAuthenticated, authenticationController.user);
  app.post('/auth/logout', isAuthenticated, authenticationController.logout);
  app.post('/auth/forgotPassword', authenticationController.forgotPassword);
  app.get('/auth/resetPassword', authenticationController.renderResetPasswordTemplate);
  app.post('/auth/resetPassword', authenticationControllerPolicy.reset, authenticationController.resetPassword);
  app.post(
    '/auth/changePassword',
    isAuthenticated,
    authenticationControllerPolicy.changePassword,
    authenticationController.changePassword
  );

  // qapp routes
  app.get('/api/qapps', isAuthenticated, qappController.index);
  app.get('/api/qapps/:id', isAuthenticated, qappController.show);
  app.post('/api/qapps', isAuthenticated, qappController.store);
  app.delete('/api/qapps', isAuthenticated, qappController.archive);
  app.post('/api/qapps/data', isAuthenticated, qappController.saveData);
  app.put('/api/qapps/data', isAuthenticated, qappController.updateData);
  app.delete('/api/qapps/data', isAuthenticated, qappController.deleteData);

  // qapp section routes
  app.post('/api/completed-sections', isAuthenticated, qappController.addCompletedSection);
  app.delete('/api/completed-sections', isAuthenticated, qappController.deleteCompletedSection);

  // structure (projects/sections/questions) routes
  app.get('/api/sections', isAuthenticated, structureController.sections);
  app.get('/api/questions', isAuthenticated, structureController.questions);

  // generate routes
  app.post('/api/generate', isAuthenticated, generateController.generate);

  // referencce routes
  app.get('/api/concerns', isAuthenticated, refController.concerns);
  app.get('/api/location-types', isAuthenticated, refController.locationTypes);
  app.get('/api/collection-methods', isAuthenticated, refController.collectionMethods);
  app.get('/api/coord-ref-systems', isAuthenticated, refController.coordRefSystems);
  app.get('/api/crosswalks', isAuthenticated, refController.crosswalks);
};
