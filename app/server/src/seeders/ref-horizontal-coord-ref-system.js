module.exports = {
  up: (queryInterface) => {
    const records = [];
    records.push({
      id: 1,
      code: 'NAD83',
      label: 'NAD83',
    });
    records.push({
      id: 2,
      code: 'WGS84',
      label: 'WGS84',
    });
    records.push({
      id: 3,
      code: 'OTH',
      label: 'Other',
    });
    records.push({
      id: 4,
      code: 'UKN',
      label: 'Unknown',
    });
    return queryInterface.bulkInsert('RefHorizontalCoordRefSystems', records);
  },

  down: (queryInterface) => queryInterface.bulkDelete('RefHorizontalCoordRefSystems', null, {}),
};
