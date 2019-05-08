module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('QappData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      qappId: {
        type: Sequelize.UUID,
      },
      questionId: {
        type: Sequelize.INTEGER
      },
      dataEntryValue: {
        type: Sequelize.STRING(4000)
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
    return queryInterface.dropTable('QappData');
  }
};
