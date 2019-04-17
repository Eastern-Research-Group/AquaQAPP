module.exports = (sequelize, DataTypes) => {
  const ProjectOutlineQuestion = sequelize.define(
    'ProjectOutlineQuestion',
    {
      projectId: DataTypes.INTEGER,
      outlineNumber: DataTypes.STRING,
      questionLabel: DataTypes.STRING,
      dataEntryInstructions: DataTypes.STRING,
      dataEntryTip: DataTypes.STRING,
      dataEntryType: DataTypes.STRING,
      maxLength: DataTypes.INTEGER,
      hasExamples: DataTypes.BOOLEAN,
      outlineQuestionSort: DataTypes.INTEGER
    },
    {}
  );
  ProjectOutlineQuestion.associate = function(models) {
    // associations can be defined here
  };
  return ProjectOutlineQuestion;
};