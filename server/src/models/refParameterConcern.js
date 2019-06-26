module.exports = (sequelize, DataTypes) => {
  const RefParameterConcern = sequelize.define(
    'RefParameterConcern',
    {
      refConcernId: DataTypes.INTEGER,
      refParameterId: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    }
  );
  return RefParameterConcern;
};
