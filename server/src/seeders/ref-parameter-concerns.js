const path = require('path');
const { csvToJson } = require('../utils/jsonHelpers');

module.exports = {
  up: async (queryInterface) => {
    const json = await csvToJson(path.resolve(__dirname, './data/ParameterConcerns.csv'));
    return queryInterface.bulkInsert('RefParameterConcerns', json);
  },

  down: (queryInterface) => queryInterface.bulkDelete('RefParameterConcerns', null, {}),
};
