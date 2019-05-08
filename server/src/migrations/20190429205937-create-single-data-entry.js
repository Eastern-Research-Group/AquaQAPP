module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('QappSingleDataEntry', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      qappId: {
        type: Sequelize.UUID
      },
      questionId: {
        type: Sequelize.INTEGER
      },
      value: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: (queryInterface) => queryInterface.dropTable('QappSingleDataEntry'),
};
