module.exports = (sequelize, DataTypes) => {
  const QappOutline = sequelize.define(
    'QappOutline',
    {
      qappId: DataTypes.UUID,
      outlineId: DataTypes.INTEGER,
    },
    {}
  );

  return QappOutline;
};
