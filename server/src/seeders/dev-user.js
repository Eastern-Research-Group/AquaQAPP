const { User } = require('../models');

module.exports = {
  // if test user doesn't already exist, create
  up: () => {
    User.findOrCreate({
      where: { email: 'tester@test.com' },
      defaults: {
        name: 'Tester',
        email: 'tester@test.com',
        password: 'password',
        createdAt: new Date(),
        updatedAt: new Date(),
        organization: 'Test',
      },
    });
    return User.findOrCreate({
      where: { email: 'tester@test.com' },
      defaults: {
        name: 'Section Tester',
        email: 'tester2@test.com',
        password: 'password',
        createdAt: new Date(),
        updatedAt: new Date(),
        organization: 'Test',
      },
    });
  },
  // we won't want to delete user table data, so just return an empty promise on down method
  down: () => Promise.resolve(),
};
