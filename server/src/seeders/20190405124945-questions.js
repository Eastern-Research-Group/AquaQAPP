module.exports = {
  up: (queryInterface) => {
    const records = [];
    records.push({
      sectionNumber: '1',
      questionLabel: 'QAPP Title',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'text',
      maxLength: '255',
      hasExamples: false,
      sectionQuestionSort: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '2',
      questionLabel: 'Prepared By',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'largeText',
      maxLength: '4000',
      hasExamples: false,
      sectionQuestionSort: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '3',
      questionLabel: 'Full Name',
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
      sectionNumber: '3',
      questionLabel: 'Title/Position',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'text',
      maxLength: '75',
      hasExamples: false,
      sectionQuestionSort: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '3',
      questionLabel: 'Include in distribution list?',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'checkbox',
      maxLength: '75',
      hasExamples: false,
      sectionQuestionSort: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '3',
      questionLabel: 'Include in the approval list?',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'checkbox',
      maxLength: '75',
      hasExamples: false,
      sectionQuestionSort: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '3',
      questionLabel: 'Primary Contact',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'singleCheckbox',
      maxLength: '75',
      hasExamples: false,
      sectionQuestionSort: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '3',
      questionLabel: 'Organization',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'text',
      maxLength: '512',
      hasExamples: false,
      sectionQuestionSort: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '3',
      questionLabel: 'Address',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'text',
      maxLength: '4000',
      hasExamples: false,
      sectionQuestionSort: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '3',
      questionLabel: 'City',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'text',
      maxLength: '1000',
      hasExamples: false,
      sectionQuestionSort: 8,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '3',
      questionLabel: 'State',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'text',
      maxLength: '1000',
      hasExamples: false,
      sectionQuestionSort: 9,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '3',
      questionLabel: 'Zip',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'text',
      maxLength: '1000',
      hasExamples: false,
      sectionQuestionSort: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '3',
      questionLabel: 'Telephone',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'text',
      maxLength: '1000',
      hasExamples: false,
      sectionQuestionSort: 11,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '3',
      questionLabel: 'Email',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'text',
      maxLength: '1000',
      hasExamples: false,
      sectionQuestionSort: 12,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '3',
      questionLabel: 'Responsibilities',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'largeText',
      maxLength: '4096',
      hasExamples: false,
      sectionQuestionSort: 14,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '4',
      questionLabel: 'Problem Definition',
      dataEntryInstructions:
        'State the specific environmental problem to be investigated. Include sufficient background information to provide a historical and scientific perspective for the current project.',
      dataEntryTip:
        '<b>Be sure to:</b> <li>Check the text carefully</li><li>Change the wording if it does not make sense to you.</li><p>ITEP has assembled a website of resources including example SPSs technical reports, spreadsheets, databases, EPA laws, programs and links.</p>',
      dataEntryType: 'largeText',
      maxLength: '4000',
      hasExamples: true,
      sectionQuestionSort: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '5',
      questionLabel: 'Problem Background',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'largeText',
      maxLength: '4000',
      hasExamples: false,
      sectionQuestionSort: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '6',
      questionLabel: 'Organizational History and Mission',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'largeText',
      maxLength: '4000',
      hasExamples: false,
      sectionQuestionSort: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '7',
      questionLabel: 'Monitoring History and Status',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'largeText',
      maxLength: '4000',
      hasExamples: false,
      sectionQuestionSort: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '8',
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
      sectionNumber: '10',
      questionLabel: 'What are your water quality concerns? Select all that apply.',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'checkboxBtn',
      maxLength: '100',
      hasExamples: false,
      sectionQuestionSort: 1,
      refName: 'concerns',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '10',
      questionLabel: 'Do your water quality concerns differ by sampling location?',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'checkboxBtn',
      maxLength: '5',
      hasExamples: false,
      sectionQuestionSort: 2,
      refName: 'yesNo',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '11',
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
      sectionNumber: '11',
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
      sectionNumber: '11',
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
      sectionNumber: '11',
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
      sectionNumber: '11',
      questionLabel: 'Water Type',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'radio',
      maxLength: '255',
      hasExamples: false,
      sectionQuestionSort: 5,
      refName: 'waterTypes',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '11',
      questionLabel: 'Water Quality Concerns',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'select',
      maxLength: '255',
      hasExamples: false,
      sectionQuestionSort: 6,
      refName: 'concerns',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '11',
      questionLabel: 'Location Type',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'select',
      maxLength: '45',
      hasExamples: false,
      sectionQuestionSort: 7,
      refName: 'locationTypes',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '11',
      questionLabel: 'Horizontal Collection Method',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'select',
      maxLength: '150',
      hasExamples: false,
      sectionQuestionSort: 8,
      refName: 'collectionMethods',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '11',
      questionLabel: 'Horizontal Coordinate Reference System',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'select',
      maxLength: '6',
      hasExamples: false,
      sectionQuestionSort: 9,
      refName: 'coordRefSystems',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '12',
      questionLabel: 'Parameters',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: '',
      maxLength: '0',
      hasExamples: false,
      sectionQuestionSort: 1,
      refName: 'parameters',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return queryInterface.bulkInsert('Questions', records);
  },
};
