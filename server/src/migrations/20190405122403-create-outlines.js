module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Outlines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      outlineNumber: {
        type: Sequelize.STRING,
      },
      outlineLevel: {
        type: Sequelize.STRING,
      },
      outlineLabel: {
        type: Sequelize.STRING,
      },
      outlineSort: {
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
  down: (queryInterface) => {
    return queryInterface.dropTable('Outlines');
  },
};
