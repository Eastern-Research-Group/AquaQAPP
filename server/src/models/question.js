module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define(
    'Question',
    {
      outlineNumber: DataTypes.STRING,
      questionLabel: DataTypes.STRING,
      dataEntryInstructions: DataTypes.STRING,
      dataEntryTip: DataTypes.STRING,
      dataEntryType: DataTypes.STRING,
      maxLength: DataTypes.INTEGER,
      hasExamples: DataTypes.BOOLEAN,
      outlineQuestionSort: DataTypes.INTEGER,
    },
    {}
  );
  /* Question.associate = function(models) {
    // associations can be defined here
  }; */
  return Question;
};
