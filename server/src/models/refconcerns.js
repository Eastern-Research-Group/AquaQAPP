'use strict';
module.exports = (sequelize, DataTypes) => {
  const refConcerns = sequelize.define('refConcerns', {
    concernCode: DataTypes.STRING,
    concernLabel: DataTypes.STRING
  }, {});
  refConcerns.associate = function(models) {
    // associations can be defined here
  };
  return refConcerns;
};