module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sections', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      sectionNumber: {
        type: Sequelize.STRING,
      },
      sectionLevel: {
        type: Sequelize.STRING,
      },
      sectionLabel: {
        type: Sequelize.STRING,
      },
      sectionName: {
        type: Sequelize.STRING,
      },
      sectionSort: {
        type: Sequelize.INTEGER,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Sections');
  },
};
