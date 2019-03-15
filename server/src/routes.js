const authenticationController = require('./controllers/authenticationController');
const authenticationControllerPolicy = require('./policies/authenticationControllerPolicy');
const dashboardController = require('./controllers/dashboardController');
const isAuthenticated = require('./policies/isAuthenticated');

module.exports = (app) => {
    app.post('/register',
        authenticationControllerPolicy.register,
        authenticationController.register);

    app.post('/login',
        authenticationController.login);

    app.get('/dashboard',
        isAuthenticated,
        dashboardController.dashboard);
};

