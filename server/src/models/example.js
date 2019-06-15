module.exports = (sequelize, DataTypes) => {
  const Example = sequelize.define(
    'Example',
    {
      questionId: DataTypes.INTEGER,
      text: DataTypes.TEXT,
    },
    {
      timestamps: false,
    }
  );
  return Example;
};
