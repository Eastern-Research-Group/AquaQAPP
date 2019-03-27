const { User } = require('../models');

module.exports = {
  // if test user doesn't already exist, create
  up: () => User.findOrCreate({
    where: { email: 'tester2@test.com' },
    defaults: {
      name: 'Second Tester',
      email: 'tester2@test.com',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  }),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {}),
};
