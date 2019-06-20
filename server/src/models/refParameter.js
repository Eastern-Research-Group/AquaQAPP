module.exports = (sequelize, DataTypes) => {
  const RefParameter = sequelize.define(
    'RefParameter',
    {
      name: DataTypes.STRING,
      concern: DataTypes.STRING,
      waterType: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );
  return RefParameter;
};
