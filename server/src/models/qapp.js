'use strict';
module.exports = (sequelize, DataTypes) => {
  const Qapp = sequelize.define('Qapp', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Qapp.associate = function(models) {
    // associations can be defined here
  };
  return Qapp;
};