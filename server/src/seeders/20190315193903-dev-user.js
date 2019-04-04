const { User } = require('../models');

module.exports = {
  // if test user doesn't already exist, create
  up: () =>
    User.findOrCreate({
      where: { email: 'tester@test.com' },
      defaults: {
        name: 'Tester',
        email: 'tester@test.com',
        password: 'password',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
