module.exports = (sequelize, DataTypes) => {
  const RefHorizontalCoordRefSystem = sequelize.define(
    'RefHorizontalCoordRefSystem',
    {
      code: DataTypes.STRING,
      label: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );
  return RefHorizontalCoordRefSystem;
};
