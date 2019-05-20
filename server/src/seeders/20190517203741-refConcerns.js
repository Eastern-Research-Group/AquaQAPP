module.exports = {
  up: (queryInterface) => {
    const records = [];
    records.push({
      concernCode: 'GENPHYS',
      concernLabel: 'General Environmental Health: Physical/Chemical Water Quality',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      concernCode: 'EUTRO',
      concernLabel: 'Eutrophication (Nutrients)',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      concernCode: 'ILLCONN',
      concernLabel: 'Illicit Connections',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      concernCode: 'GENBENTHIC',
      concernLabel: 'General Environmental Health: Benthic',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      concernCode: 'ALGAL',
      concernLabel: 'Harmful Algal Blooms (HABs) (Algal Toxins)',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      concernCode: 'STORMWTR',
      concernLabel: 'Stormwater',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      concernCode: 'REC',
      concernLabel: 'Recreation (Swimming and/or Boating)',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      concernCode: 'ACID',
      concernLabel: 'Acidification',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      concernCode: 'OTH',
      concernLabel: 'Other',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return queryInterface.bulkInsert('refConcerns', records);
  },
};
