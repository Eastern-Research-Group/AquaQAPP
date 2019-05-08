module.exports = {
  up: (queryInterface) => {
    const records = [];
    records.push({
      projectId: 1,
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
      projectId: 1,
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
      projectId: 1,
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
      projectId: 1,
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
      projectId: 1,
      outlineNumber: '8',
      questionLabel: 'Locations',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: '',
      maxLength: '0',
      hasExamples: false,
      outlineQuestionSort: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      projectId: 1,
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
    return queryInterface.bulkInsert('ProjectOutlineQuestions', records);
  },
};
