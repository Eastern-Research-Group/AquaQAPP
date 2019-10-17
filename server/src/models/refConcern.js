module.exports = (sequelize, DataTypes) => {
  const RefConcern = sequelize.define(
    'RefConcern',
    {
      code: DataTypes.STRING,
      label: DataTypes.STRING,
      concernSort: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    }
  );
  return RefConcern;
};
