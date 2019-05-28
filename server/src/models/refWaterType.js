module.exports = (sequelize, DataTypes) => {
  const RefWaterType = sequelize.define(
    'RefWaterType',
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      timestamps: false,
    }
  );
  return RefWaterType;
};
