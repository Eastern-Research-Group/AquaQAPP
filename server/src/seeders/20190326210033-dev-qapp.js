const { Qapp } = require('../models');

module.exports = {
  // if test qapp doesn't already exist, create
  up: () =>
    Qapp.findOrCreate({
      where: { title: 'Second Tester QAPP' },
      defaults: {
        title: 'This is another test QAPP',
        instanceId: 1,
        userId: 2,
        description: 'This is another test QAPP.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),

  down: (queryInterface) => queryInterface.bulkDelete('Qapps', null, {}),
};
