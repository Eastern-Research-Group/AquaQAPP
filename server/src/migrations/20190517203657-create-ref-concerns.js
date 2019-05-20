module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('refConcerns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      concernCode: {
        type: Sequelize.STRING,
      },
      concernLabel: {
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
    return queryInterface.dropTable('refConcerns');
  },
};
