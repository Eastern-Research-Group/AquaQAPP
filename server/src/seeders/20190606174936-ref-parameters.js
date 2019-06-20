const path = require('path');
const { csvToJson } = require('../utils/jsonHelpers');

module.exports = {
  up: async (queryInterface) => {
    const json = await csvToJson(path.resolve(__dirname, './data/Parameters.csv'));
    return queryInterface.bulkInsert('RefParameters', json);
  },
};
