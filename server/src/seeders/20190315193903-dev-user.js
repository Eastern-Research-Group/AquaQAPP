const {User} = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    // if test user doesn't already exist, create
    return User.findOrCreate( {
      where: { email: 'tester@test.com' },
      defaults: {
        name: 'Tester',
        email: 'tester@test.com',
        password: 'password',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
