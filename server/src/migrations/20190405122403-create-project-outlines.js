module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ProjectOutlines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      projectId: {
        type: Sequelize.INTEGER
      },
      outlineNumber: {
        type: Sequelize.STRING
      },
      outlineLevel: {
        type: Sequelize.STRING
      },
      outlineLabel: {
        type: Sequelize.STRING
      },
      outlineSort: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ProjectOutlines');
  }
};