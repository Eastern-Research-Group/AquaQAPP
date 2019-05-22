module.exports = {
  up: (queryInterface) => {
    const records = [];
    records.push({
      sectionNumber: '1',
      questionLabel: 'Prepared By',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'text',
      maxLength: '75',
      hasExamples: false,
      sectionQuestionSort: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '2',
      questionLabel: 'Prepared For',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'text',
      maxLength: '75',
      hasExamples: false,
      sectionQuestionSort: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '4',
      questionLabel: 'Problem Definition',
      dataEntryInstructions:
        'State the specific envrionmental problem to be investigated. Include sufficient background information to provide an historical and scientific perspective for the current project.',
      dataEntryTip:
        '<b>Be sure to:</b> <li>Check the text carefully</li><li>Change the wording if it does not make sense to you.</li><p>Itep has assembled a website of resources including example SPSs technical reports spreadsheets datbases epa laws and commrenations programs and links.</p>',
      dataEntryType: 'largeText',
      maxLength: '4000',
      hasExamples: true,
      sectionQuestionSort: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '5',
      questionLabel: 'Project Description',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'largeText',
      maxLength: '4000',
      hasExamples: true,
      sectionQuestionSort: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '7',
      questionLabel: 'Water Quality Concerns',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: '',
      maxLength: '0',
      hasExamples: false,
      sectionQuestionSort: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '8',
      questionLabel: 'Location ID',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'text',
      maxLength: '35',
      hasExamples: false,
      sectionQuestionSort: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '8',
      questionLabel: 'Location Name',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'text',
      maxLength: '255',
      hasExamples: false,
      sectionQuestionSort: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '8',
      questionLabel: 'Location Latitude',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'text',
      maxLength: '8',
      hasExamples: false,
      sectionQuestionSort: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '8',
      questionLabel: 'Location Longitude',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'text',
      maxLength: '9',
      hasExamples: false,
      sectionQuestionSort: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '8',
      questionLabel: 'Location Type',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'select',
      maxLength: '45',
      hasExamples: false,
      sectionQuestionSort: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '8',
      questionLabel: 'Horizontal Collection Method',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'select',
      maxLength: '150',
      hasExamples: false,
      sectionQuestionSort: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '8',
      questionLabel: 'Horizontal Coordinate Reference System',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'select',
      maxLength: '6',
      hasExamples: false,
      sectionQuestionSort: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '9',
      questionLabel: 'Pollutants',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: '',
      maxLength: '0',
      hasExamples: false,
      sectionQuestionSort: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return queryInterface.bulkInsert('Questions', records);
  },
};
