module.exports = {
  up: (queryInterface) => {
    const records = [];
    records.push({
      id: '18',
      name: 'Interpolation-Map',
      description: 'The geographic coordinate determination method based on interpolation-map',
    });
    records.push({
      id: '28',
      name: 'GPS-Unspecified',
      description: 'Global Positioning Method, with unspecified parameters',
    });
    records.push({
      id: '20',
      name: 'Interpolation-Satellite',
      description: 'The geographic coordinate determination method based on interpolation-satellite',
    });
    records.push({
      id: '6',
      name: 'Address Matching-Digitized',
      description: 'The geographic coordinate determination method based on address matching-digitized',
    });
    records.push({
      id: '25',
      name: 'Classical Surveying Techniques',
      description: 'The geographic coordinate determination method based on classical surveying techniques',
    });
    records.push({
      id: '27',
      name: 'Unknown',
      description: 'The information is not known',
    });

    return queryInterface.bulkInsert('RefHorizontalCollectionMethods', records);
  },

  down: (queryInterface) => queryInterface.bulkDelete('RefHorizontalCollectionMethods', null, {}),
};
