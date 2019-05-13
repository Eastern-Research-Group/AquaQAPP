module.exports = (sequelize, DataTypes) => {
  const Outline = sequelize.define(
    'Outline',
    {
      outlineNumber: DataTypes.STRING,
      outlineLevel: DataTypes.STRING,
      outlineLabel: DataTypes.STRING,
      outlineSort: DataTypes.INTEGER,
    },
    {}
  );
  /* Outline.associate = function(models) {
    // associations can be defined here
  }; */
  return Outline;
};
