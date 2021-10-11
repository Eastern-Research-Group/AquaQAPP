module.exports = {
  up: (queryInterface) => {
    const records = [];
    records.push({
      code: 'BPSEST',
      label: 'BEACH Program Site - Estuary',
    });
    records.push({
      code: 'BPSLK',
      label: 'BEACH Program Site - Lake',
    });
    records.push({
      code: 'BPSOC',
      label: 'BEACH Program Site - Ocean',
    });
    records.push({
      code: 'BPSRS',
      label: 'BEACH Program Site - River/Stream',
    });
    records.push({
      code: 'EST',
      label: 'Estuary',
    });
    records.push({
      code: 'LK',
      label: 'Lake',
    });
    records.push({
      code: 'OC',
      label: 'Ocean',
    });
    records.push({
      code: 'RS',
      label: 'River/Stream',
    });
    return queryInterface.bulkInsert('RefLocationTypes', records);
  },

  down: (queryInterface) => queryInterface.bulkDelete('RefLocationTypes', null, {}),
};
