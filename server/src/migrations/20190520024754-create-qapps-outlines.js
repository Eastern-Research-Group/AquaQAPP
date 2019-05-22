

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('QappsOutlines', {
      qappId: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      outlineId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('QappsOutlines');
  },
};
