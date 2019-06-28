module.exports = {
  up(queryInterface) {
    const records = [];
    records.push({
      sectionNumber: '1',
      sectionLevel: '1',
      sectionLabel: 'General Information',
      sectionName: 'generalInformation',
      sectionSort: 1,
    });
    records.push({
      sectionNumber: '2',
      sectionLevel: '1',
      sectionLabel: 'Prepared By',
      sectionName: 'preparedBy',
      sectionSort: 2,
    });
    records.push({
      sectionNumber: '3',
      sectionLevel: '1',
      sectionLabel: 'Project Organization/Personnel',
      sectionName: 'projectOrganization',
      sectionSort: 3,
    });
    records.push({
      sectionNumber: '4',
      sectionLevel: '1',
      sectionLabel: 'Problem Definition',
      sectionName: 'problemDefinition',
      sectionSort: 4,
    });
    records.push({
      sectionNumber: '5',
      sectionLevel: '1',
      sectionLabel: 'Problem Background',
      sectionName: 'problemBackground',
      sectionSort: 5,
    });
    records.push({
      sectionNumber: '6',
      sectionLevel: '1',
      sectionLabel: 'Project Description',
      sectionName: 'projectDescription',
      sectionSort: 6,
    });
    records.push({
      sectionNumber: '7',
      sectionLevel: '1',
      sectionLabel: 'Organizational History and Mission',
      sectionName: 'orgHistoryMission',
      sectionSort: 7,
    });
    records.push({
      sectionNumber: '8',
      sectionLevel: '1',
      sectionLabel: 'Monitoring History and Status',
      sectionName: 'monitorHistoryStatus',
      sectionSort: 8,
    });
    records.push({
      sectionNumber: '9',
      sectionLevel: '1',
      sectionLabel: 'Project Activities',
      sectionName: 'projectActivities',
      sectionSort: 9,
    });
    records.push({
      sectionNumber: '10',
      sectionLevel: '1',
      sectionLabel: 'Water Quality Concerns',
      sectionName: 'waterQualityConcerns',
      sectionSort: 10,
    });
    records.push({
      sectionNumber: '11',
      sectionLevel: '1',
      sectionLabel: 'Monitoring Locations',
      sectionName: 'monitoringLocations',
      sectionSort: 11,
    });
    records.push({
      sectionNumber: '12',
      sectionLevel: '1',
      sectionLabel: 'Parameters',
      sectionName: 'parameters',
      sectionSort: 12,
    });
    records.push({
      sectionNumber: '13',
      sectionLevel: '1',
      sectionLabel: 'Sample Design',
      sectionName: 'sampleDesign',
      sectionSort: 13,
    });
    return queryInterface.bulkInsert('Sections', records);
  },
};
