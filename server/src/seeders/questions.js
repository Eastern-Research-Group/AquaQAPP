const path = require('path');
const { csvToJson } = require('../utils/jsonHelpers');

module.exports = {
  up: async (queryInterface) => {
    const questions = await csvToJson(path.resolve(__dirname, './data/Questions.csv'));
    return queryInterface.bulkInsert('Questions', questions);
  },

  down: (queryInterface) => queryInterface.bulkDelete('Questions', null, {}),
};
