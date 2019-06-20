module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      sectionNumber: {
        type: Sequelize.STRING,
      },
      questionName: {
        type: Sequelize.STRING,
      },
      questionLabel: {
        type: Sequelize.STRING,
      },
      dataEntryInstructions: {
        type: Sequelize.STRING(1000),
      },
      dataEntryTip: {
        type: Sequelize.STRING(2000),
      },
      dataEntryType: {
        type: Sequelize.STRING,
      },
      maxLength: {
        type: Sequelize.INTEGER,
      },
      hasExamples: {
        type: Sequelize.BOOLEAN,
      },
      sectionQuestionSort: {
        type: Sequelize.INTEGER,
      },
      refName: {
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
    return queryInterface.dropTable('Questions');
  },
};
