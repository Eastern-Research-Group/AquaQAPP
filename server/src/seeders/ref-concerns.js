module.exports = {
  up: (queryInterface) => {
    const records = [];
    records.push({
      code: 'GENPHYS',
      label: 'General Environmental Health: Physical/Chemical Water Quality',
    });
    records.push({
      code: 'EUTRO',
      label: 'Eutrophication (Nutrients)',
    });
    records.push({
      code: 'ILLCONN',
      label: 'Illicit Connections',
    });
    records.push({
      code: 'GENBENTHIC',
      label: 'General Environmental Health: Benthic',
    });
    records.push({
      code: 'ALGAL',
      label: 'Harmful Algal Blooms (HABs) (Algal Toxins)',
    });
    records.push({
      code: 'STORMWTR',
      label: 'Stormwater',
    });
    records.push({
      code: 'REC',
      label: 'Recreation (Swimming and/or Boating)',
    });
    records.push({
      code: 'ACID',
      label: 'Acidification',
    });
    records.push({
      code: 'OTH',
      label: 'Other',
    });
    return queryInterface.bulkInsert('RefConcerns', records);
  },

  down: (queryInterface) => queryInterface.bulkDelete('RefConcerns', null, {}),
};
