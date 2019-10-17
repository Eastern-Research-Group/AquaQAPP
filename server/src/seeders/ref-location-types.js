const path = require('path');
const { csvToJson } = require('../utils/jsonHelpers');

module.exports = {
  up: async (queryInterface) => {
    const json = await csvToJson(path.resolve(__dirname, './data/LocationTypes.csv'));
    return queryInterface.bulkInsert('RefLocationTypes', json);
  },

  down: (queryInterface) => queryInterface.bulkDelete('RefLocationTypes', null, {}),
};
