module.exports = (sequelize, DataTypes) => {
  const Crosswalk = sequelize.define(
    'Crosswalk',
    {
      order: DataTypes.INTEGER,
      description: DataTypes.STRING,
      dynamic: DataTypes.BOOLEAN,
      waterType: DataTypes.STRING,
      concern: DataTypes.STRING,
      samplingMethodology: DataTypes.STRING,
      parameter: DataTypes.STRING,
      analyticalMethod: DataTypes.STRING,
      filePath: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );
  return Crosswalk;
};
