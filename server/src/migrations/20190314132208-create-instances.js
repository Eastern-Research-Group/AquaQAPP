module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Instances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      instanceName: {
        type: Sequelize.STRING,
      },
      instanceTitle: {
        type: Sequelize.STRING,
      },
      instanceDesc: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Instances');
  },
};
