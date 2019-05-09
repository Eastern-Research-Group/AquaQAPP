// const { Qapp } = require('./index');

module.exports = (sequelize, DataTypes) => {
  const QappDatum = sequelize.define(
    'QappDatum',
    {
      qappId: DataTypes.UUID,
      questionId: DataTypes.INTEGER,
      value: DataTypes.TEXT,
    },
    {}
  );

  return QappDatum;
};
