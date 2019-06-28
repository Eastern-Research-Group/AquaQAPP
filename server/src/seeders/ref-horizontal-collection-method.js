const path = require('path');
const { wqxXmlToJson } = require('../utils/jsonHelpers');

module.exports = {
  up: (queryInterface) => {
    const json = wqxXmlToJson(path.resolve(__dirname, './data/HorizontalCollectionMethod.xml'));
    return queryInterface.bulkInsert('RefHorizontalCollectionMethods', json);
  },

  down: (queryInterface) => queryInterface.bulkDelete('RefHorizontalCollectionMethods', null, {}),
};
