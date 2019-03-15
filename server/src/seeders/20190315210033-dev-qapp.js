const {Qapp} = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    // if test user doesn't already exist, create
    return Qapp.findOrCreate( {
      where: { title: 'Test QAPP' },
      defaults: {
        name: 'Test QAPP',
        description: 'This is a test QAPP.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Qapps', null, {});
  }
};
