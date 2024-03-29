module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RefHorizontalCoordRefSystems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      code: {
        type: Sequelize.STRING,
      },
      label: {
        type: Sequelize.STRING,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('RefHorizontalCoordRefSystems');
  },
};
