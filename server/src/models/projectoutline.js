'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProjectOutline = sequelize.define(
    'ProjectOutline',
    {
      projectId: DataTypes.INTEGER,
      outlineNumber: DataTypes.STRING,
      outlineLevel: DataTypes.STRING,
      outlineLabel: DataTypes.STRING,
      outlineSort: DataTypes.INTEGER
    },
    {}
  );
  ProjectOutline.associate = function(models) {
    // associations can be defined here
  };
  return ProjectOutline;
};
