module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RefHorizontalCoordRefSystems', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('RefHorizontalCoordRefSystems');
  },
};
