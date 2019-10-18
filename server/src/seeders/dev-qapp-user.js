const uuidv4 = require('uuid/v4');
const { Qapp, QappDatum, User } = require('../models');

module.exports = {
  up: (queryInterface) => {
    const testQappId = uuidv4();
    const testQapp2Id = uuidv4();

    // Fill test qapp with some data
    const qappDataRecords = [
      {
        questionId: 1,
        value: 'Completed QAPP',
      },
      {
        questionId: 2,
        value: 'Testing Tester\nEastern Research Group, Inc.',
      },
      {
        questionId: 3,
        value: 'John Doe',
        valueId: 1,
      },
      {
        questionId: 4,
        value: 'Environmental Scientist',
        valueId: 1,
      },
      {
        questionId: 5,
        value: 'X',
        valueId: 1,
      },
      {
        questionId: 6,
        value: '',
        valueId: 1,
      },
      {
        questionId: 7,
        value: 'X',
        valueId: 1,
      },
      {
        questionId: 8,
        value: 'Eastern Research Group',
        valueId: 1,
      },
      {
        questionId: 9,
        value: 'Sampling',
        valueId: 1,
      },
      {
        questionId: 10,
        value: '1234 Main St',
        valueId: 1,
      },
      {
        questionId: 11,
        value: 'Westchestertonfieldville',
        valueId: 1,
      },
      {
        questionId: 12,
        value: 'IA',
        valueId: 1,
      },
      {
        questionId: 13,
        value: '12345',
        valueId: 1,
      },
      {
        questionId: 14,
        value: '(123) 456-7890',
        valueId: 1,
      },
      {
        questionId: 15,
        value: 'tester@test.com',
        valueId: 1,
      },
      {
        questionId: 16,
        value: 'Sampling',
        valueId: 1,
      },
      {
        questionId: 17,
        value: 'Water quality decline',
      },
      {
        questionId: 18,
        value: 'Water quality has declined',
      },
      {
        questionId: 19,
        value: 'Project description',
      },
      {
        questionId: 20,
        value: 'Sampling',
        valueId: 1,
      },
      {
        questionId: 21,
        value: '',
        valueId: 1,
      },
      {
        questionId: 22,
        value: '',
        valueId: 1,
      },
      {
        questionId: 23,
        value: 'X',
        valueId: 1,
      },
      {
        questionId: 24,
        value: '',
        valueId: 1,
      },
      {
        questionId: 25,
        value: '',
        valueId: 1,
      },
      {
        questionId: 26,
        value: 'X',
        valueId: 1,
      },
      {
        questionId: 27,
        value: '',
        valueId: 1,
      },
      {
        questionId: 28,
        value: '',
        valueId: 1,
      },
      {
        questionId: 29,
        value: 'X',
        valueId: 1,
      },
      {
        questionId: 30,
        value: '',
        valueId: 1,
      },
      {
        questionId: 31,
        value: '',
        valueId: 1,
      },
      {
        questionId: 32,
        value: 'X',
        valueId: 1,
      },
      {
        questionId: 33,
        value: 'ACID,GENPHYS,REC',
      },
      {
        questionId: 34,
        value: 'N',
      },
      {
        questionId: 35,
        value: '12345',
        valueId: 1,
      },
      {
        questionId: 36,
        value: 'Sampling Location',
        valueId: 1,
      },
      {
        questionId: 37,
        value: '38.9072',
        valueId: 1,
      },
      {
        questionId: 38,
        value: '-77.0369',
        valueId: 1,
      },
      {
        questionId: 39,
        value: 'Fresh',
        valueId: 1,
      },
      {
        questionId: 41,
        value: '1',
        valueId: 1,
      },
      {
        questionId: 42,
        value: '3',
        valueId: 1,
      },
      {
        questionId: 43,
        value: '3',
        valueId: 1,
      },
      {
        questionId: 44,
        value: '1,3',
      },
      {
        questionId: 45,
        value: '1',
        valueId: 1,
      },
      {
        questionId: 46,
        value: 12,
        valueId: 1,
      },
      {
        questionId: 47,
        value: 'Rationale',
        valueId: 1,
      },
      {
        questionId: 48,
        value: 'Rationale',
        valueId: 1,
      },
      {
        questionId: 49,
        value: 'Frequently',
        valueId: 1,
      },
      {
        questionId: 50,
        value: 10,
        valueId: 1,
      },
      {
        questionId: 45,
        value: '3',
        valueId: 2,
      },
      {
        questionId: 46,
        value: 8,
        valueId: 2,
      },
      {
        questionId: 47,
        value: 'Rationale',
        valueId: 2,
      },
      {
        questionId: 48,
        value: 'Rationale',
        valueId: 2,
      },
      {
        questionId: 49,
        value: 'Frequently',
        valueId: 2,
      },
      {
        questionId: 50,
        value: 10,
        valueId: 2,
      },
      {
        questionId: 51,
        value: 'Record keeping',
        valueId: 1,
      },
      {
        questionId: 52,
        value: 'Procedure',
        valueId: 1,
      },
      {
        questionId: 53,
        value: 'Source',
        valueId: 1,
      },
      {
        questionId: 54,
        value: 'Beach',
        valueId: 1,
      },
      {
        questionId: 55,
        value: 'Chloride',
        valueId: 1,
      },
      {
        questionId: 56,
        value: 'Sample Design',
        valueId: 1,
      },
      {
        questionId: 57,
        value: 'Northeast',
        valueId: 1,
      },
      {
        questionId: 58,
        value: 'https://google.com',
        valueId: 1,
      },
    ];
    const records = qappDataRecords.map((record) => ({
      ...record,
      qappId: testQappId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    queryInterface.bulkInsert('QappData', records);
    QappDatum.create({
      qappId: testQapp2Id,
      questionId: 1,
      value: 'Empty QAPP',
    });
    const completedSections = [];
    for (let i = 1; i < 14; i += 1) {
      completedSections.push({
        qappId: testQappId,
        sectionId: i,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    queryInterface.bulkInsert('CompletedQappSections', completedSections);

    User.create({
      name: 'Tester',
      email: 'tester@test.com',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date(),
      organization: 'Test',
    }).then(() => {
      Qapp.create({
        id: testQappId,
        userId: 1,
        archived: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      Qapp.create({
        id: testQapp2Id,
        userId: 1,
        archived: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    return User.create({
      name: 'Section Tester',
      email: 'tester2@test.com',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date(),
      organization: 'Test',
    });
  },
  // we won't want to delete qapp table data, so just return an empty promise on down method
  down: () => Promise.resolve(),
};
