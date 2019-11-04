module.exports = {
  up: (queryInterface) => {
    const records = [];
    records.push({
      code: 'NAD83',
      label: 'NAD83',
    });
    records.push({
      code: 'WGS84',
      label: 'WGS84',
    });
    records.push({
      code: 'OTH',
      label: 'Other',
    });
    records.push({
      code: 'UKN',
      label: 'Unknown',
    });
    return queryInterface.bulkInsert('RefHorizontalCoordRefSystems', records);
  },

  down: (queryInterface) => queryInterface.bulkDelete('RefHorizontalCoordRefSystems', null, {}),
};
