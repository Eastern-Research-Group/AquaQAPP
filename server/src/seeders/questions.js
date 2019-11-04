module.exports = {
  up: (queryInterface) => {
    let records = [];
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
    });
    records.push({
      sectionNumber: '3',
      questionName: 'fullName',
      questionLabel: 'Full Name of Personnel',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'text',
      maxLength: '75',
      hasExamples: false,
      sectionQuestionSort: 1,
    });
    records.push({
      sectionNumber: '3',
      questionName: 'titlePosition',
      questionLabel: 'Job Title',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'text',
      maxLength: '75',
      hasExamples: false,
      sectionQuestionSort: 2,
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
    });
    records.push({
      sectionNumber: '3',
      questionName: 'organization',
      questionLabel: 'Organization Name',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'text',
      maxLength: '512',
      hasExamples: false,
      sectionQuestionSort: 6,
    });
    records.push({
      sectionNumber: '3',
      questionName: 'roles',
      questionLabel: 'Roles',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'select',
      maxLength: '4000',
      hasExamples: false,
      refName: 'roles',
      sectionQuestionSort: 7,
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
      sectionQuestionSort: 8,
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
      sectionQuestionSort: 9,
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
      sectionQuestionSort: 10,
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
      sectionQuestionSort: 11,
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
      sectionQuestionSort: 12,
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
      sectionQuestionSort: 13,
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
    });
    records.push({
      sectionNumber: '4',
      questionName: 'problemDefinition',
      questionLabel: 'Problem Definition',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'largeText',
      maxLength: '4000',
      hasExamples: true,
      sectionQuestionSort: 1,
    });
    records.push({
      sectionNumber: '5',
      questionName: 'projectBackground',
      questionLabel: 'Project Background',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'largeText',
      maxLength: '4000',
      hasExamples: false,
      sectionQuestionSort: 1,
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
    });
    records.push({
      sectionNumber: '7',
      questionName: 'activity',
      questionLabel: 'Activity',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'largeText',
      maxLength: '4000',
      hasExamples: true,
      sectionQuestionSort: 1,
    });
    records.push({
      sectionNumber: '7',
      questionName: 'january',
      questionLabel: 'January',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'checkbox',
      maxLength: '75',
      hasExamples: true,
      sectionQuestionSort: 2,
    });
    records.push({
      sectionNumber: '7',
      questionName: 'february',
      questionLabel: 'February',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'checkbox',
      maxLength: '75',
      hasExamples: true,
      sectionQuestionSort: 3,
    });
    records.push({
      sectionNumber: '7',
      questionName: 'march',
      questionLabel: 'March',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'checkbox',
      maxLength: '75',
      hasExamples: true,
      sectionQuestionSort: 4,
    });
    records.push({
      sectionNumber: '7',
      questionName: 'april',
      questionLabel: 'April',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'checkbox',
      maxLength: '75',
      hasExamples: true,
      sectionQuestionSort: 5,
    });
    records.push({
      sectionNumber: '7',
      questionName: 'may',
      questionLabel: 'May',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'checkbox',
      maxLength: '75',
      hasExamples: true,
      sectionQuestionSort: 6,
    });
    records.push({
      sectionNumber: '7',
      questionName: 'june',
      questionLabel: 'June',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'checkbox',
      maxLength: '75',
      hasExamples: true,
      sectionQuestionSort: 7,
    });
    records.push({
      sectionNumber: '7',
      questionName: 'july',
      questionLabel: 'July',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'checkbox',
      maxLength: '75',
      hasExamples: true,
      sectionQuestionSort: 8,
    });
    records.push({
      sectionNumber: '7',
      questionName: 'august',
      questionLabel: 'August',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'checkbox',
      maxLength: '75',
      hasExamples: true,
      sectionQuestionSort: 9,
    });
    records.push({
      sectionNumber: '7',
      questionName: 'september',
      questionLabel: 'September',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'checkbox',
      maxLength: '75',
      hasExamples: true,
      sectionQuestionSort: 10,
    });
    records.push({
      sectionNumber: '7',
      questionName: 'october',
      questionLabel: 'October',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'checkbox',
      maxLength: '75',
      hasExamples: true,
      sectionQuestionSort: 11,
    });
    records.push({
      sectionNumber: '7',
      questionName: 'november',
      questionLabel: 'November',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'checkbox',
      maxLength: '75',
      hasExamples: true,
      sectionQuestionSort: 12,
    });
    records.push({
      sectionNumber: '7',
      questionName: 'december',
      questionLabel: 'December',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'checkbox',
      maxLength: '75',
      hasExamples: true,
      sectionQuestionSort: 13,
    });
    records.push({
      sectionNumber: '8',
      questionName: 'waterConcerns',
      questionLabel: 'Water Quality Concerns',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'checkboxBtn',
      maxLength: '100',
      hasExamples: false,
      sectionQuestionSort: 1,
      refName: 'concerns',
    });
    records.push({
      sectionNumber: '8',
      questionName: 'differByLocation',
      questionLabel: 'Do your water quality concerns differ by sampling location?',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'checkboxBtn',
      maxLength: '5',
      hasExamples: false,
      sectionQuestionSort: 2,
      refName: 'yesNo',
    });
    records.push({
      sectionNumber: '9',
      questionName: 'locationId',
      questionLabel: 'Location ID',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'text',
      maxLength: '35',
      hasExamples: false,
      sectionQuestionSort: 1,
    });
    records.push({
      sectionNumber: '9',
      questionName: 'locationName',
      questionLabel: 'Location Name',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'text',
      maxLength: '255',
      hasExamples: false,
      sectionQuestionSort: 2,
    });
    records.push({
      sectionNumber: '9',
      questionName: 'locationLat',
      questionLabel: 'Location Latitude',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'text',
      maxLength: '12',
      hasExamples: false,
      sectionQuestionSort: 3,
    });
    records.push({
      sectionNumber: '9',
      questionName: 'locationLong',
      questionLabel: 'Location Longitude',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'text',
      maxLength: '12',
      hasExamples: false,
      sectionQuestionSort: 4,
    });
    records.push({
      sectionNumber: '9',
      questionName: 'waterType',
      questionLabel: 'Water Type',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'radio',
      maxLength: '255',
      hasExamples: false,
      sectionQuestionSort: 5,
      refName: 'waterTypes',
    });
    records.push({
      sectionNumber: '9',
      questionName: 'mapWaterConcerns',
      questionLabel: 'Water Quality Concerns',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'select',
      maxLength: '255',
      hasExamples: false,
      sectionQuestionSort: 6,
      refName: 'concerns',
    });
    records.push({
      sectionNumber: '9',
      questionName: 'locationType',
      questionLabel: 'Location Type',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'select',
      maxLength: '45',
      hasExamples: false,
      sectionQuestionSort: 7,
      refName: 'locationTypes',
    });
    records.push({
      sectionNumber: '9',
      questionName: 'horizCollectionMethod',
      questionLabel: 'Horizontal Collection Method',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'select',
      maxLength: '150',
      hasExamples: false,
      sectionQuestionSort: 8,
      refName: 'collectionMethods',
    });
    records.push({
      sectionNumber: '9',
      questionName: 'horizCoordinateSystem',
      questionLabel: 'Horizontal Coordinate Reference System',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'select',
      maxLength: '6',
      hasExamples: false,
      sectionQuestionSort: 9,
      refName: 'coordRefSystems',
    });
    records.push({
      sectionNumber: '10',
      questionLabel: 'Parameters',
      questionName: 'parameters',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: '',
      maxLength: '255',
      hasExamples: false,
      sectionQuestionSort: 1,
      refName: 'parameters',
    });
    records.push({
      sectionNumber: '11',
      questionLabel: 'Parameter',
      questionName: 'sampleParameter',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'select',
      maxLength: '255',
      hasExamples: false,
      sectionQuestionSort: 1,
      refName: 'parameters',
    });
    records.push({
      sectionNumber: '11',
      questionLabel: 'Number of Sample Locations',
      questionName: 'numSampleLocations',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'number',
      maxLength: '4',
      hasExamples: false,
      sectionQuestionSort: 2,
    });
    records.push({
      sectionNumber: '11',
      questionLabel: 'Site Location Rationale',
      questionName: 'locationRationale',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'select',
      maxLength: '2000',
      hasExamples: false,
      sectionQuestionSort: 3,
      refName: 'locationRationales',
    });
    records.push({
      sectionNumber: '11',
      questionLabel: 'Rationale for Number of Samples',
      questionName: 'sampleNumRationale',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'select',
      maxLength: '2000',
      hasExamples: false,
      sectionQuestionSort: 4,
      refName: 'sampleNumRationales',
    });
    records.push({
      sectionNumber: '11',
      questionLabel: 'Frequency',
      questionName: 'frequency',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'largeText',
      maxLength: '255',
      hasExamples: false,
      sectionQuestionSort: 5,
    });
    records.push({
      sectionNumber: '11',
      questionLabel: 'Number/Type of QC Samples',
      questionName: 'numQcSamples',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'largeText',
      maxLength: '255',
      hasExamples: false,
      sectionQuestionSort: 6,
    });
    records.push({
      sectionNumber: '12',
      questionName: 'activity',
      questionLabel: 'Activity',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'text',
      maxLength: '75',
      hasExamples: false,
      sectionQuestionSort: 1,
    });
    records.push({
      sectionNumber: '12',
      questionName: 'procedures',
      questionLabel: 'Procedures',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'largeText',
      maxLength: '255',
      hasExamples: false,
      sectionQuestionSort: 2,
    });
    records.push({
      sectionNumber: '13',
      questionName: 'dataSource',
      questionLabel: 'Data Source',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'text',
      maxLength: '75',
      hasExamples: false,
      sectionQuestionSort: 1,
    });
    records.push({
      sectionNumber: '13',
      questionName: 'waterbodyType',
      questionLabel: 'Waterbody Type',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'text',
      maxLength: '75',
      hasExamples: false,
      sectionQuestionSort: 2,
    });
    records.push({
      sectionNumber: '13',
      questionName: 'sampleDataParams',
      questionLabel: 'Sample Data Parameters',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'largeText',
      maxLength: '2000',
      hasExamples: false,
      sectionQuestionSort: 3,
    });
    records.push({
      sectionNumber: '13',
      questionName: 'sampleDesign',
      questionLabel: 'Sampling Design',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'text',
      maxLength: '75',
      hasExamples: false,
      sectionQuestionSort: 4,
    });
    records.push({
      sectionNumber: '13',
      questionName: 'geographicArea',
      questionLabel: 'Geographic Area',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'text',
      maxLength: '75',
      hasExamples: false,
      sectionQuestionSort: 5,
    });
    records.push({
      sectionNumber: '13',
      questionName: 'webDataLinks',
      questionLabel: 'Web Data Links',
      dataEntryInstructions: '',
      dataEntryTip: '',
      dataEntryType: 'largeText',
      maxLength: '2000',
      hasExamples: false,
      sectionQuestionSort: 6,
    });
    // manually set ids so they always start at 1 (question ids are used when saving data so must be consistent)
    records = records.map((record, index) => ({
      ...record,
      id: index + 1,
    }));
    return queryInterface.bulkInsert('Questions', records);
  },

  down: (queryInterface) => queryInterface.bulkDelete('Questions', null, {}),
};
