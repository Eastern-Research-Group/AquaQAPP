module.exports = {
  up(queryInterface) {
    const records = [];
    records.push({
      sectionNumber: '1',
      sectionLevel: '1',
      sectionLabel: 'General Information',
      sectionSort: 1,
    });
    records.push({
      sectionNumber: '2',
      sectionLevel: '1',
      sectionLabel: 'Prepared By',
      sectionSort: 1,
    });
    records.push({
      sectionNumber: '3',
      sectionLevel: '1',
      sectionLabel: 'Prepared For',
      sectionSort: 2,
    });
    records.push({
      sectionNumber: '4',
      sectionLevel: '1',
      sectionLabel: 'Project Organization/Personnel',
      sectionSort: 3,
    });
    records.push({
      sectionNumber: '5',
      sectionLevel: '1',
      sectionLabel: 'Problem Definition/Background',
      sectionSort: 4,
    });
    records.push({
      sectionNumber: '6',
      sectionLevel: '1',
      sectionLabel: 'Project Tasks',
      sectionSort: 5,
    });
    records.push({
      sectionNumber: '7',
      sectionLevel: '1',
      sectionLabel: 'Project Schedule',
      sectionSort: 6,
    });
    records.push({
      sectionNumber: '8',
      sectionLevel: '1',
      sectionLabel: 'Water Quality Concerns',
      sectionSort: 7,
    });
    records.push({
      sectionNumber: '9',
      sectionLevel: '1',
      sectionLabel: 'Monitoring Locations',
      sectionSort: 8,
    });
    records.push({
      sectionNumber: '10',
      sectionLevel: '1',
      sectionLabel: 'Parameters',
      sectionSort: 9,
    });
    records.push({
      sectionNumber: '11',
      sectionLevel: '1',
      sectionLabel: 'Sample Design',
      sectionSort: 10,
    });
    return queryInterface.bulkInsert('Sections', records);
  },
};
