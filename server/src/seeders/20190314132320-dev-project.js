const { Project } = require('../models');

module.exports = {
  up: () =>
    Project.findOrCreate({
      where: { projectName: 'AquaQAPP' },
      defaults: {
        projectName: 'AquaQAPP',
        projectTitle: 'Friends of the Charles River Watershed Group QAPP',
        projectDescription: 'Longer description if desired for splash page or documentation.',
        showOutlineNumber: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),

  down: (queryInterface) => queryInterface.bulkDelete('Projects', null, {}),
};
