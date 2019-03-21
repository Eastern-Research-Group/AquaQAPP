const authenticationController = require('./controllers/authenticationController');
const authenticationControllerPolicy = require('./policies/authenticationControllerPolicy');
const dashboardController = require('./controllers/dashboardController');
const isAuthenticated = require('./policies/isAuthenticated');

module.exports = (app) => {
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
};
