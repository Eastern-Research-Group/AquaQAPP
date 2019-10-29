module.exports = {
  up: (queryInterface) => {
    const records = [];
    records.push({
      code: 'GENPHYS',
      label: 'General Environmental Health: Physical/Chemical Water Quality',
      concernSort: 1,
    });
    records.push({
      code: 'EUTRO',
      label: 'Eutrophication (Nutrients)',
      concernSort: 3,
    });
    records.push({
      code: 'ILLCONN',
      label: 'Illicit Connections',
      concernSort: 5,
    });
    records.push({
      code: 'GENBENTHIC',
      label: 'General Environmental Health: Benthic',
      concernSort: 2,
    });
    records.push({
      code: 'ALGAL',
      label: 'Harmful Algal Blooms (HABs) (Algal Toxins)',
      concernSort: 4,
    });
    records.push({
      code: 'STORMWTR',
      label: 'Stormwater',
      concernSort: 7,
    });
    records.push({
      code: 'REC',
      label: 'Recreation (Swimming and/or Boating)',
      concernSort: 6,
    });
    records.push({
      code: 'OTH',
      label: 'Other',
      concernSort: 8,
    });
    return queryInterface.bulkInsert('RefConcerns', records);
  },

  down: (queryInterface) => queryInterface.bulkDelete('RefConcerns', null, {}),
};
