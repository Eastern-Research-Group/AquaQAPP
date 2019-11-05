module.exports = (sequelize, DataTypes) => {
  const RefRole = sequelize.define(
    'RefRole',
    {
      code: DataTypes.STRING,
      label: DataTypes.STRING,
      responsibilities: DataTypes.TEXT,
    },
    {
      timestamps: false,
    }
  );
  return RefRole;
};
