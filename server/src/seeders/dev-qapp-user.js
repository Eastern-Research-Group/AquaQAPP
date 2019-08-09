const uuidv4 = require('uuid/v4');
const { Qapp, QappDatum, User } = require('../models');

module.exports = {
  up: () => {
    const testQappId = uuidv4();
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
    User.findOrCreate({
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
  // we won't want to delete qapp table data, so just return an empty promise on down method
  down: () => Promise.resolve(),
};
