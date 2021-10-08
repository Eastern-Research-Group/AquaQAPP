module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Examples', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      questionId: {
        type: Sequelize.INTEGER,
      },
      text: {
        type: Sequelize.TEXT,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Examples');
  },
};
