module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CompletedQappSections', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      qappId: {
        type: Sequelize.UUID,
      },
      sectionId: {
        type: Sequelize.INTEGER,
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

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('CompletedQappSections');
  },
};
