const path = require('path');
const { wqxXmlToJson } = require('../utils/jsonHelpers');

module.exports = {
  up: (queryInterface) => {
    const json = wqxXmlToJson(path.resolve(__dirname, './data/HorizontalReferenceDatum.xml'));
    return queryInterface.bulkInsert('RefHorizontalCoordRefSystems', json);
  },

  down: (queryInterface) => queryInterface.bulkDelete('RefHorizontalCoordRefSystems', null, {}),
};
