module.exports = {
  up: (queryInterface) => {
    const records = [];
    records.push({
      outlineNumber: '1',
      questionLabel: 'Prepared By',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'text',
      maxLength: '75',
      hasExamples: false,
      outlineQuestionSort: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      outlineNumber: '2',
      questionLabel: 'Prepared For',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'text',
      maxLength: '75',
      hasExamples: false,
      outlineQuestionSort: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      outlineNumber: '4',
      questionLabel: 'Problem Definition',
      dataEntryInstructions:
        'State the specific envrionmental problem to be investigated. Include sufficient background information to provide an historical and scientific perspective for the current project.',
      dataEntryTip:
        '<b>Be sure to:</b> <li>Check the text carefully</li><li>Change the wording if it does not make sense to you.</li><p>Itep has assembled a website of resources including example SPSs technical reports spreadsheets datbases epa laws and commrenations programs and links.</p>',
      dataEntryType: 'largeText',
      maxLength: '4000',
      hasExamples: true,
      outlineQuestionSort: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      outlineNumber: '5',
      questionLabel: 'Project Description',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'largeText',
      maxLength: '4000',
      hasExamples: true,
      outlineQuestionSort: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      outlineNumber: '8',
      questionLabel: 'Location ID',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'text',
      maxLength: '35',
      hasExamples: false,
      outlineQuestionSort: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      outlineNumber: '8',
      questionLabel: 'Location Name',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'text',
      maxLength: '255',
      hasExamples: false,
      outlineQuestionSort: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      outlineNumber: '8',
      questionLabel: 'Location Latitude',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'text',
      maxLength: '8',
      hasExamples: false,
      outlineQuestionSort: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      outlineNumber: '8',
      questionLabel: 'Location Longitude',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'text',
      maxLength: '9',
      hasExamples: false,
      outlineQuestionSort: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      outlineNumber: '8',
      questionLabel: 'Location Type',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'select',
      maxLength: '45',
      hasExamples: false,
      outlineQuestionSort: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      outlineNumber: '8',
      questionLabel: 'Horizontal Collection Method',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'select',
      maxLength: '150',
      hasExamples: false,
      outlineQuestionSort: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      outlineNumber: '8',
      questionLabel: 'Horizontal Coordinate Reference System',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'select',
      maxLength: '6',
      hasExamples: false,
      outlineQuestionSort: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      outlineNumber: '9',
      questionLabel: 'Pollutants',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: '',
      maxLength: '0',
      hasExamples: false,
      outlineQuestionSort: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return queryInterface.bulkInsert('Questions', records);
  },
};
