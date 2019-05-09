module.exports = (sequelize, DataTypes) => {
  const Qapp = sequelize.define(
    'Qapp',
    {
      projectId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      description: DataTypes.STRING,
    },
    {}
  );

  return Qapp;
};
