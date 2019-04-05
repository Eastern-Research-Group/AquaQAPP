module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Instances');
  },
};
