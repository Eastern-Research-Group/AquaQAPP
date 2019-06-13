module.exports = (sequelize, DataTypes) => {
  const Qapp = sequelize.define(
    'Qapp',
    {
      userId: DataTypes.INTEGER,
      archived: DataTypes.BOOLEAN,
    },
    {}
  );

  return Qapp;
};
