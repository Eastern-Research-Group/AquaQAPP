'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var records = [];
    records.push({
      projectId: 1,
      outlineNumber: '1.1',
      questionLabel: 'Problem Definition',
      dataEntryInstructions: 'State the specific envrionmental problem to be investigated. Include sufficient background information to provide an historical and scientific perspective for the current project.',
      dataEntryTip: '<b>Be sure to:</b> <li>Check the text carefully</li><li>Change the wording if it does not make sense to you.</li><p>Itep has assembled a website of resources including example SPSs technical reports spreadsheets datbases epa laws and commrenations programs and links.</p>',
      dataEntryType: 'largeText',
      hasExamples: 'Y',
      outlineQuestionSort: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      projectId: 1,
      outlineNumber: '1.2',
      questionLabel: 'Project Name',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'text',
      hasExamples: 'N',
      outlineQuestionSort: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      projectId: 1,
      outlineNumber: '1.2',
      questionLabel: 'Responsible Agency',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'text',
      hasExamples: 'N',
      outlineQuestionSort: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return queryInterface.bulkInsert('ProjectOutlineQuestions', records);
  }
};
