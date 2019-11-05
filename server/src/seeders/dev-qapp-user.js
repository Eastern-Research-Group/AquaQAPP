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
        value: 'PM',
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
        value: '123-456-7890',
        valueId: 1,
      },
      {
        questionId: 15,
        value: 'tester@test.com',
        valueId: 1,
      },
      {
        questionId: 16,
        value: 'Water quality decline',
      },
      {
        questionId: 17,
        value: 'Water quality has declined',
      },
      {
        questionId: 18,
        value: 'Project description',
      },
      {
        questionId: 19,
        value: 'Sampling',
        valueId: 1,
      },
      {
        questionId: 20,
        value: '',
        valueId: 1,
      },
      {
        questionId: 21,
        value: '',
        valueId: 1,
      },
      {
        questionId: 22,
        value: 'X',
        valueId: 1,
      },
      {
        questionId: 23,
        value: '',
        valueId: 1,
      },
      {
        questionId: 24,
        value: '',
        valueId: 1,
      },
      {
        questionId: 25,
        value: 'X',
        valueId: 1,
      },
      {
        questionId: 26,
        value: '',
        valueId: 1,
      },
      {
        questionId: 27,
        value: '',
        valueId: 1,
      },
      {
        questionId: 28,
        value: 'X',
        valueId: 1,
      },
      {
        questionId: 29,
        value: '',
        valueId: 1,
      },
      {
        questionId: 30,
        value: '',
        valueId: 1,
      },
      {
        questionId: 31,
        value: 'X',
        valueId: 1,
      },
      {
        questionId: 32,
        value: 'ACID,GENPHYS,REC',
      },
      {
        questionId: 33,
        value: 'N',
      },
      {
        questionId: 34,
        value: '12345',
        valueId: 1,
      },
      {
        questionId: 35,
        value: 'Sampling Location',
        valueId: 1,
      },
      {
        questionId: 36,
        value: '38.9072',
        valueId: 1,
      },
      {
        questionId: 37,
        value: '-77.0369',
        valueId: 1,
      },
      {
        questionId: 38,
        value: 'Fresh',
        valueId: 1,
      },
      {
        questionId: 40,
        value: 'Estuary',
        valueId: 1,
      },
      {
        questionId: 41,
        value: '3',
        valueId: 1,
      },
      {
        questionId: 42,
        value: 'NAD83',
        valueId: 1,
      },
      {
        questionId: 43,
        value: '1,3',
      },
      {
        questionId: 44,
        value: '1',
        valueId: 1,
      },
      {
        questionId: 45,
        value: 12,
        valueId: 1,
      },
      {
        questionId: 46,
        value: 'Rationale',
        valueId: 1,
      },
      {
        questionId: 47,
        value: 'Rationale',
        valueId: 1,
      },
      {
        questionId: 48,
        value: 'Frequently',
        valueId: 1,
      },
      {
        questionId: 49,
        value: 10,
        valueId: 1,
      },
      {
        questionId: 44,
        value: '3',
        valueId: 2,
      },
      {
        questionId: 45,
        value: 8,
        valueId: 2,
      },
      {
        questionId: 46,
        value: 'Rationale',
        valueId: 2,
      },
      {
        questionId: 47,
        value: 'Rationale',
        valueId: 2,
      },
      {
        questionId: 48,
        value: 'Frequently',
        valueId: 2,
      },
      {
        questionId: 49,
        value: 10,
        valueId: 2,
      },
      {
        questionId: 50,
        value: 'Record keeping',
        valueId: 1,
      },
      {
        questionId: 51,
        value: 'Procedure',
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
    for (let i = 1; i < 13; i += 1) {
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
