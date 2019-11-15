module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RefProcedures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      activity: {
        type: Sequelize.STRING,
      },
      placeholder: {
        type: Sequelize.TEXT,
      },
      procedureSort: {
        type: Sequelize.INTEGER,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('RefProcedures');
  },
};
