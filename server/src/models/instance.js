module.exports = (sequelize, DataTypes) => {
  const Instance = sequelize.define(
    'Instance',
    {
      instanceName: DataTypes.STRING,
      instanceTitle: DataTypes.STRING,
      instanceDesc: DataTypes.STRING,
    },
    {}
  );
  /* Instance.associate = function(models) {
    // associations can be defined here
  }; */
  return Instance;
};
