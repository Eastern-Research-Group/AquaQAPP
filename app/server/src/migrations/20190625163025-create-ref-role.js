module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RefRoles', {
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
      responsibilities: {
        type: Sequelize.TEXT,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('RefRoles');
  },
};
