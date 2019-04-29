module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('QappData');
  },
  down: (queryInterface) => queryInterface.dropTable('QappData'),
};