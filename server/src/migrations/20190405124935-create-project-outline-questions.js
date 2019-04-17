module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ProjectOutlineQuestions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      projectId: {
        type: Sequelize.INTEGER
      },
      outlineNumber: {
        type: Sequelize.STRING
      },
      questionLabel: {
        type: Sequelize.STRING
      },
      dataEntryInstructions: {
        type: Sequelize.STRING(1000)
      },
      dataEntryTip: {
        type: Sequelize.STRING(2000)
      },
      dataEntryType: {
        type: Sequelize.STRING
      },
      maxLength: {
        type: Sequelize.INTEGER
      },
      hasExamples: {
        type: Sequelize.CHAR
      },
      outlineQuestionSort: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ProjectOutlineQuestions');
  }
};