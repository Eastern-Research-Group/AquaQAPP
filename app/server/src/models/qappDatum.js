module.exports = (sequelize, DataTypes) => {
  const QappDatum = sequelize.define(
    'QappDatum',
    {
      qappId: DataTypes.UUID,
      questionId: DataTypes.INTEGER,
      valueId: DataTypes.INTEGER,
      value: DataTypes.TEXT,
    },
    {}
  );

  return QappDatum;
};
