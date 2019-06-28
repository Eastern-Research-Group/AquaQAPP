module.exports = (sequelize, DataTypes) => {
  const RefLocationType = sequelize.define(
    'RefLocationType',
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      timestamps: false,
    }
  );
  return RefLocationType;
};
