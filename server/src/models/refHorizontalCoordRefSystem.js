module.exports = (sequelize, DataTypes) => {
  const RefHorizontalCoordRefSystem = sequelize.define(
    'RefHorizontalCoordRefSystem',
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      timestamps: false,
    }
  );
  return RefHorizontalCoordRefSystem;
};
