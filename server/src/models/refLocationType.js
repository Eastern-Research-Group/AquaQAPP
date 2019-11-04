module.exports = (sequelize, DataTypes) => {
  const RefLocationType = sequelize.define(
    'RefLocationType',
    {
      code: DataTypes.STRING,
      label: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );
  return RefLocationType;
};
