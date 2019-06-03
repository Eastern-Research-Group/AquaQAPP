const uuidv4 = require('uuid/v4');
const { Qapp } = require('../models');

module.exports = {
  // if test qapp doesn't already exist, create
  up: () =>
    Qapp.findOrCreate({
      where: { title: 'Test QAPP' },
      defaults: {
        id: uuidv4(),
        title: 'Test QAPP',
        userId: 1,
        description: 'This is a test QAPP.',
        archived: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),

  down: (queryInterface) => queryInterface.bulkDelete('Qapps', null, {}),
};
