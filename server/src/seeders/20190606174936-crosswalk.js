const path = require('path');
const { csvToJson } = require('../utils/jsonHelpers');

module.exports = {
  up: async (queryInterface) => {
    const json = await csvToJson(path.resolve(__dirname, './data/ExampleCrosswalk.csv'));
    return queryInterface.bulkInsert('Crosswalks', json);
  },
};
