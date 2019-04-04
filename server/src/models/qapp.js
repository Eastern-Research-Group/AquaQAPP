module.exports = (sequelize, DataTypes) => {
  const Qapp = sequelize.define(
    'Qapp',
    {
      instanceId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      description: DataTypes.STRING,
    },
    {}
  );

  /* associations defined here
  Qapp.associate = (models) => {

  }; */

  return Qapp;
};
