module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Crosswalks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      order: {
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.STRING,
      },
      dynamic: {
        type: Sequelize.BOOLEAN,
      },
      waterType: {
        type: Sequelize.STRING,
      },
      concern: {
        type: Sequelize.STRING,
      },
      samplingMethodology: {
        type: Sequelize.STRING,
      },
      parameter: {
        type: Sequelize.STRING,
      },
      analyticalMethod: {
        type: Sequelize.STRING,
      },
      filePath: {
        type: Sequelize.STRING,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Crosswalks');
  },
};
