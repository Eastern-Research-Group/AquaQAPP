const uuidv4 = require('uuid/v4');
const { Qapp, QappDatum } = require('../models');

module.exports = {
  up: () => {
    const testQappId = uuidv4();
    Qapp.create({
      id: testQappId,
      userId: 1,
      archived: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    // set test qapp's title
    return QappDatum.create({
      qappId: testQappId,
      questionId: 1,
      value: 'Test QAPP',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },
  down: (queryInterface) => queryInterface.bulkDelete('Qapps', null, {}),
};
