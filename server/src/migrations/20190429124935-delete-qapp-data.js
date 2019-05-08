module.exports = {
  up: (queryInterface) => {
    return queryInterface.dropTable('QappData');
  },
  down: (queryInterface) => queryInterface.dropTable('QappData'),
};
