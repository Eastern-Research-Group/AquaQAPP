module.exports = (sequelize, DataTypes) => {
  const RefHorizontalCollectionMethod = sequelize.define(
    'RefHorizontalCollectionMethod',
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      timestamps: false,
    }
  );
  return RefHorizontalCollectionMethod;
};
