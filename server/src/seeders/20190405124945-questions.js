module.exports = {
  up: (queryInterface) => {
    const records = [];
    records.push({
      sectionNumber: '1',
      questionName: 'title',
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
      questionName: 'preparedBy',
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
      questionName: 'fullName',
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
      questionName: 'titlePosition',
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
      questionName: 'distributionList',
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
      questionName: 'approvalList',
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
      questionName: 'primaryContact',
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
      questionName: 'organization',
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
      questionName: 'address',
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
      questionName: 'city',
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
      questionName: 'state',
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
      questionName: 'zip',
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
      questionName: 'telephone',
      questionLabel: 'Telephone',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'tel',
      maxLength: '1000',
      hasExamples: false,
      sectionQuestionSort: 11,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '3',
      questionName: 'email',
      questionLabel: 'Email',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'email',
      maxLength: '1000',
      hasExamples: false,
      sectionQuestionSort: 12,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '3',
      questionName: 'responsibilities',
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
      questionName: 'problemDefinition',
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
      questionName: 'problemBackground',
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
      questionName: 'projectDescription',
      questionLabel: 'Project Description',
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
      questionName: 'orgHistoryMission',
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
      sectionNumber: '8',
      questionName: 'monitorHistoryStatus',
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
      sectionNumber: '9',
      questionName: 'activity',
      questionLabel: 'Activity',
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
      sectionNumber: '9',
      questionName: 'january',
      questionLabel: 'January',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'checkbox',
      maxLength: '75',
      hasExamples: true,
      sectionQuestionSort: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '9',
      questionName: 'february',
      questionLabel: 'February',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'checkbox',
      maxLength: '75',
      hasExamples: true,
      sectionQuestionSort: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '9',
      questionName: 'march',
      questionLabel: 'March',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'checkbox',
      maxLength: '75',
      hasExamples: true,
      sectionQuestionSort: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '9',
      questionName: 'april',
      questionLabel: 'April',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'checkbox',
      maxLength: '75',
      hasExamples: true,
      sectionQuestionSort: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '9',
      questionName: 'may',
      questionLabel: 'May',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'checkbox',
      maxLength: '75',
      hasExamples: true,
      sectionQuestionSort: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '9',
      questionName: 'june',
      questionLabel: 'June',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'checkbox',
      maxLength: '75',
      hasExamples: true,
      sectionQuestionSort: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '9',
      questionName: 'july',
      questionLabel: 'July',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'checkbox',
      maxLength: '75',
      hasExamples: true,
      sectionQuestionSort: 8,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '9',
      questionName: 'august',
      questionLabel: 'August',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'checkbox',
      maxLength: '75',
      hasExamples: true,
      sectionQuestionSort: 9,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '9',
      questionName: 'september',
      questionLabel: 'September',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'checkbox',
      maxLength: '75',
      hasExamples: true,
      sectionQuestionSort: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '9',
      questionName: 'october',
      questionLabel: 'October',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'checkbox',
      maxLength: '75',
      hasExamples: true,
      sectionQuestionSort: 11,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '9',
      questionName: 'november',
      questionLabel: 'November',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'checkbox',
      maxLength: '75',
      hasExamples: true,
      sectionQuestionSort: 12,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '9',
      questionName: 'december',
      questionLabel: 'December',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'checkbox',
      maxLength: '75',
      hasExamples: true,
      sectionQuestionSort: 13,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '10',
      questionName: 'waterConcerns',
      questionLabel: 'Water Quality Concerns',
      dataEntryInstructions: 'What are your water quality concerns? Select all that apply.',
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
      questionName: 'differByLocation',
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
      questionName: 'locationId',
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
      questionName: 'locationName',
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
      questionName: 'locationLat',
      questionLabel: 'Location Latitude',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'text',
      maxLength: '12',
      hasExamples: false,
      sectionQuestionSort: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '11',
      questionName: 'locationLong',
      questionLabel: 'Location Longitude',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'text',
      maxLength: '12',
      hasExamples: false,
      sectionQuestionSort: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '11',
      questionName: 'waterType',
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
      questionName: 'mapWaterConcerns',
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
      questionName: 'locationType',
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
      questionName: 'horizCollectionMethod',
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
      questionName: 'horizCoordinateSystem',
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
      questionName: 'parameters',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: '',
      maxLength: '255',
      hasExamples: false,
      sectionQuestionSort: 1,
      refName: 'parameters',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '13',
      questionLabel: 'Parameter',
      questionName: 'sampleParameter',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'select',
      maxLength: '255',
      hasExamples: false,
      sectionQuestionSort: 1,
      refName: 'parameters',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '13',
      questionLabel: 'Number of Sample Locations',
      questionName: 'numSampleLocations',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'number',
      maxLength: '4',
      hasExamples: false,
      sectionQuestionSort: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '13',
      questionLabel: 'Site Location Rationale',
      questionName: 'locationRationale',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'select',
      maxLength: '2000',
      hasExamples: false,
      sectionQuestionSort: 3,
      refName: 'locationRationales',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '13',
      questionLabel: 'Rationale for Number of Samples',
      questionName: 'sampleNumRationale',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'select',
      maxLength: '2000',
      hasExamples: false,
      sectionQuestionSort: 4,
      refName: 'sampleNumRationales',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '13',
      questionLabel: 'Frequency',
      questionName: 'frequency',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'largeText',
      maxLength: '255',
      hasExamples: false,
      sectionQuestionSort: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      sectionNumber: '13',
      questionLabel: 'Number/Type of QC Samples',
      questionName: 'numQcSamples',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'largeText',
      maxLength: '255',
      hasExamples: false,
      sectionQuestionSort: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return queryInterface.bulkInsert('Questions', records);
  },
};
