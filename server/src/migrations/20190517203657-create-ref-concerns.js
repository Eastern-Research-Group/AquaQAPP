module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RefConcerns', {
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
      description: {
        type: Sequelize.STRING,
      },
      concernSort: {
        type: Sequelize.INTEGER,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('RefConcerns');
  },
};
