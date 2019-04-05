module.exports = (sequelize, DataTypes) => {
  const ProjectOutlineQuestions = sequelize.define(
    'ProjectOutlineQuestions',
    {
      projectId: DataTypes.INTEGER,
      outlineNumber: DataTypes.STRING,
      questionLabel: DataTypes.STRING,
      dataEntryInstructions: DataTypes.STRING,
      dataEntryTip: DataTypes.STRING,
      dataEntryType: DataTypes.STRING,
      hasExamples: DataTypes.CHAR,
      outlineQuestionSort: DataTypes.INTEGER
    },
    {}
  );
  ProjectOutlineQuestions.associate = function(models) {
    // associations can be defined here
  };
  return ProjectOutlineQuestions;
};