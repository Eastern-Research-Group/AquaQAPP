'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProjectOutlines = sequelize.define(
    'ProjectOutlines',
    {
      projectId: DataTypes.INTEGER,
      outlineNumber: DataTypes.STRING,
      outlineLevel: DataTypes.STRING,
      outlineLabel: DataTypes.STRING,
      outlineSort: DataTypes.INTEGER
    },
    {}
  );
  ProjectOutlines.associate = function(models) {
    // associations can be defined here
  };
  return ProjectOutlines;
};