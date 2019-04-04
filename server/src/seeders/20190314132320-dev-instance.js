const { Instance } = require('../models');

module.exports = {
  up: () =>
    Instance.findOrCreate({
      where: { instanceName: 'AquaQAPP' },
      defaults: {
        instanceName: 'AquaQAPP',
        instanceTitle: 'Friends of the Charles River Watershed Group QAPP',
        instanceDesc: 'Longer description if desired for splash page or documentation.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),

  down: (queryInterface) => queryInterface.bulkDelete('Instances', null, {}),
};
