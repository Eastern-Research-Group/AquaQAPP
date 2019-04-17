module.exports = (sequelize, DataTypes) => {
  const QappData = sequelize.define(
    'QappData',
    {
      qappId: DataTypes.INTEGER,
      questionId: DataTypes.INTEGER,
      dataEntryValue: DataTypes.STRING,
    },
    {}
  );

  /* associations defined here
  QappData.associate = (models) => {

  }; */

  return QappData;
};
