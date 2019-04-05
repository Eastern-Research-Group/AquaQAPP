module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Instances');
  },
  down: (queryInterface) => queryInterface.dropTable('Instances'),
};
