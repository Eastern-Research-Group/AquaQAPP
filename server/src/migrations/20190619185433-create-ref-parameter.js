module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RefParameters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      concern: {
        type: Sequelize.STRING,
      },
      waterType: {
        type: Sequelize.STRING,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('RefParameters');
  },
};
