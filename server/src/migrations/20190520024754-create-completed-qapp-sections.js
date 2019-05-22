module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CompletedQappSections', {
      qappId: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      sectionId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
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
