module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RefParameterConcerns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      refConcernId: {
        type: Sequelize.INTEGER,
      },
      refParameterId: {
        type: Sequelize.INTEGER,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('RefParameterConcerns');
  },
};
