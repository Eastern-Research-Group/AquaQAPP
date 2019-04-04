const { Qapp } = require('../models');

module.exports = {
  // if test qapp doesn't already exist, create
  up: () =>
    Qapp.findOrCreate({
      where: { title: 'Test QAPP' },
      defaults: {
        title: 'Test QAPP',
        instanceId: 1,
        userId: 1,
        description: 'This is a test QAPP.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),

  down: (queryInterface) => queryInterface.bulkDelete('Qapps', null, {}),
};
