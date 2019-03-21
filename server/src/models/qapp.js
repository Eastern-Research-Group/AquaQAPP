
module.exports = (sequelize, DataTypes) => {
  const Qapp = sequelize.define('Qapp', {
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    description: DataTypes.STRING,
  }, {});

  /* associations defined here
  Qapp.associate = (models) => {

  }; */

  return Qapp;
};
