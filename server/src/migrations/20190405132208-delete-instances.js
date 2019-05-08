module.exports = {
  up: (queryInterface) => {
    return queryInterface.dropTable('Instances');
  },
  down: (queryInterface) => queryInterface.dropTable('Instances'),
};
