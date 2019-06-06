const uuidv4 = require('uuid/v4');
const { Qapp } = require('../models');

module.exports = {
  // if test qapp doesn't already exist, create
  up: () =>
    Qapp.findOrCreate({
      where: { title: 'Second Tester QAPP' },
      defaults: {
        id: uuidv4(),
        title: 'This is another test QAPP',
        userId: 2,
        description: 'This is another test QAPP.',
        archived: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),

  down: (queryInterface) => queryInterface.bulkDelete('Qapps', null, {}),
};
