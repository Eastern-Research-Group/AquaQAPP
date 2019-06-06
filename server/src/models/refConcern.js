module.exports = (sequelize, DataTypes) => {
  const RefConcern = sequelize.define(
    'RefConcern',
    {
      code: DataTypes.STRING,
      label: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );
  return RefConcern;
};
