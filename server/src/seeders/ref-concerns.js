const concerns = require('./data/concerns').default;

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('RefConcerns', concerns);
  },

  down: (queryInterface) => queryInterface.bulkDelete('RefConcerns', null, {}),
};
