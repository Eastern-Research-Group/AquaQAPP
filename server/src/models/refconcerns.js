module.exports = (sequelize, DataTypes) => {
  const RefConcerns = sequelize.define(
    'RefConcerns',
    {
      code: DataTypes.STRING,
      label: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );
  return RefConcerns;
};
