module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RefHorizontalCollectionMethods', {
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
  down: (queryInterface) => {
    return queryInterface.dropTable('RefHorizontalCollectionMethods');
  },
};
