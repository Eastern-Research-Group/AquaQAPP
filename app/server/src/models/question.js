module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define(
    'Question',
    {
      sectionNumber: DataTypes.STRING,
      questionName: DataTypes.STRING,
      questionLabel: DataTypes.STRING,
      dataEntryInstructions: DataTypes.STRING,
      dataEntryTip: DataTypes.STRING,
      dataEntryType: DataTypes.STRING,
      maxLength: DataTypes.INTEGER,
      hasExamples: DataTypes.BOOLEAN,
      sectionQuestionSort: DataTypes.INTEGER,
      refName: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );
  /* Question.associate = function(models) {
    // associations can be defined here
  }; */
  return Question;
};
